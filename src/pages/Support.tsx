import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, TextArea, Select, Badge } from '../components/ui';
import { ArrowLeft, Send, Headphones, MessageCircle, FileText, Clock } from 'lucide-react';

export default function SupportPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="animate-fade-in-up max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <Headphones size={28} className="text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">Ticket Submitted</h1>
        <p className="text-sm text-neutral-500 mb-1">Your support ticket has been created successfully.</p>
        <p className="text-sm text-neutral-500 mb-8">Ticket ID: <span className="font-mono font-medium text-neutral-900">#TKT-2847</span></p>
        <p className="text-xs text-neutral-400 mb-8">We typically respond within 2-4 hours during business hours.</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up max-w-2xl mx-auto">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors cursor-pointer">
        <ArrowLeft size={14} /> Back
      </button>

      <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">Help & Support</h1>
      <p className="text-sm text-neutral-500 mb-8">Have an issue or question? We are here to help.</p>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: <MessageCircle size={18} />, label: 'Live Chat', desc: 'Chat with support' },
          { icon: <FileText size={18} />, label: 'FAQ', desc: 'Common questions' },
          { icon: <Clock size={18} />, label: 'Response Time', desc: '< 2 hours' },
        ].map(item => (
          <Card key={item.label} hover padding="sm" className="text-center">
            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center mx-auto mb-2 text-neutral-600">
              {item.icon}
            </div>
            <p className="text-sm font-semibold text-neutral-900">{item.label}</p>
            <p className="text-xs text-neutral-400">{item.desc}</p>
          </Card>
        ))}
      </div>

      {/* Existing tickets */}
      <Card className="mb-6">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Recent Tickets</h3>
        <div className="space-y-3">
          {[
            { id: '#TKT-2846', subject: 'Payment not received', status: 'open', date: '2 hours ago' },
            { id: '#TKT-2801', subject: 'Tasker did not show up', status: 'resolved', date: '3 days ago' },
          ].map(ticket => (
            <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-neutral-400">{ticket.id}</span>
                  <Badge variant={ticket.status === 'open' ? 'warning' : 'success'} size="sm">
                    {ticket.status === 'open' ? 'Open' : 'Resolved'}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-neutral-700">{ticket.subject}</p>
              </div>
              <span className="text-xs text-neutral-400">{ticket.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* New ticket form */}
      <Card>
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 flex items-center gap-2">
          <Send size={18} /> Submit a Ticket
        </h3>
        <p className="text-sm text-neutral-500 mb-6">Describe your issue and we will get back to you as soon as possible.</p>
        <div className="space-y-4">
          <Input label="Subject" value={subject} onChange={setSubject} placeholder="Brief description of your issue" />
          <Select
            label="Priority"
            value={priority}
            onChange={setPriority}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'normal', label: 'Normal' },
              { value: 'high', label: 'High — Urgent' },
            ]}
          />
          <Select
            label="Category"
            options={[
              { value: 'payment', label: 'Payment Issue' },
              { value: 'task', label: 'Task Issue' },
              { value: 'account', label: 'Account Issue' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select category"
          />
          <TextArea label="Description" value={description} onChange={setDescription} placeholder="Please describe your issue in detail..." rows={5} />
          <button className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-neutral-300 hover:border-neutral-400 w-full justify-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer">
            <FileText size={16} /> Attach Files (optional)
          </button>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={() => setSubmitted(true)} disabled={!subject.trim()} size="lg" icon={<Send size={16} />}>
            Submit Ticket
          </Button>
        </div>
      </Card>
    </div>
  );
}
