import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { chatMessages } from '../data/mockData';
import { Button, Avatar, Badge } from '../components/ui';
import { Send, ArrowLeft, Phone, MoreVertical, Paperclip, CheckCheck, Image } from 'lucide-react';

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(chatMessages);
  const [newMsg, setNewMsg] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages(prev => [...prev, {
      id: `m${prev.length + 1}`,
      from: 'You',
      text: newMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      read: false,
    }]);
    setNewMsg('');
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-80px)] flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-0 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <Avatar name="Usmon Ochilov" size="md" verified />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-neutral-900">Usmon Ochilov</h2>
              <Badge variant="success" size="sm">Online</Badge>
            </div>
            <p className="text-xs text-neutral-400">Deep cleaning for 3-bedroom apartment</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer">
            <Phone size={16} />
          </button>
          <button className="w-9 h-9 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 min-h-0">
        <div className="text-center">
          <span className="text-xs text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full">Today</span>
        </div>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`flex gap-2 max-w-[75%] ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
              {!msg.isOwn && <Avatar name={msg.from} size="sm" />}
              <div>
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isOwn
                    ? 'bg-neutral-900 text-white rounded-br-md'
                    : 'bg-neutral-100 text-neutral-800 rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1 mt-1 ${msg.isOwn ? 'justify-end' : ''}`}>
                  <span className="text-[10px] text-neutral-400">{msg.time}</span>
                  {msg.isOwn && <CheckCheck size={12} className={msg.read ? 'text-blue-500' : 'text-neutral-300'} />}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 pt-4 border-t border-neutral-100">
        <div className="flex items-end gap-2">
          <button className="w-10 h-10 shrink-0 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer">
            <Paperclip size={18} />
          </button>
          <button className="w-10 h-10 shrink-0 rounded-xl hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer">
            <Image size={18} />
          </button>
          <div className="flex-1 relative">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="w-full h-11 bg-neutral-50 border border-neutral-200 rounded-xl px-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 transition-all"
            />
          </div>
          <Button onClick={sendMessage} disabled={!newMsg.trim()} className="!h-11 !w-11 !p-0 shrink-0" icon={<Send size={16} />}>
            {''}
          </Button>
        </div>
      </div>
    </div>
  );
}
