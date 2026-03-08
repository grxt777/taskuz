import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phone } = await req.json();
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('998')) cleanPhone = cleanPhone.slice(0, 12);
    else if (cleanPhone.startsWith('0')) cleanPhone = '998' + cleanPhone.slice(1, 10);
    else cleanPhone = '998' + cleanPhone.slice(0, 9);
    if (cleanPhone.length !== 12 || !cleanPhone.startsWith('998')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid phone number. Use format 998901234567' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabase.from('otp_verifications').insert({
      phone: cleanPhone,
      code,
      expires_at: expiresAt.toISOString(),
    });

    const devsmsToken = Deno.env.get('DEVSMS_TOKEN');
    if (!devsmsToken) {
      console.error('DEVSMS_TOKEN not set');
      return new Response(
        JSON.stringify({ success: false, error: 'SMS service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Шаблон должен быть добавлен и одобрен в devsms.uz или my.eskiz.uz
    // DEVSMS_MESSAGE_TEMPLATE: "TaskUz: Ваш код: {code}" — замените {code} на реальный код
    const template = Deno.env.get('DEVSMS_MESSAGE_TEMPLATE') || 'TaskUz: Ваш код: {code}';
    const message = template.replace('{code}', code);

    const smsRes = await fetch('https://devsms.uz/api/send_sms.php', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${devsmsToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: cleanPhone,
        message,
        from: '4546',
      }),
    });

    const smsData = await smsRes.json();
    if (!smsData.success) {
      return new Response(
        JSON.stringify({ success: false, error: smsData.error || 'Failed to send SMS' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'OTP sent' }),
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
