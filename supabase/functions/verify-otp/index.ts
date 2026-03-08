import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phone, code, name, email, role } = await req.json();
    const cleanPhone = phone.replace(/\D/g, '');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: otpRow, error: otpError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('phone', cleanPhone)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (otpError || !otpRow) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid or expired code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('phone', cleanPhone)
      .single();

    if (!name && !email && !role) {
      if (existingProfile) {
        await supabase.from('otp_verifications').delete().eq('id', otpRow.id);
        return new Response(
          JSON.stringify({ success: true, profile: existingProfile }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ success: true, needRegistration: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    await supabase.from('otp_verifications').delete().eq('id', otpRow.id);

    let profile;
    if (existingProfile) {
      const { data: updated } = await supabase
        .from('profiles')
        .update({
          name: name || existingProfile.name,
          email: email || existingProfile.email,
          role: role || existingProfile.role,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingProfile.id)
        .select()
        .single();
      profile = updated;
    } else {
      const { data: inserted } = await supabase
        .from('profiles')
        .insert({
          phone: cleanPhone,
          name: name || 'User',
          email: email || null,
          role: role || 'client',
        })
        .select()
        .single();
      profile = inserted;
    }

    return new Response(
      JSON.stringify({ success: true, profile }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
