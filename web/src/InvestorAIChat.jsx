import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, LoaderCircle, Menu, Plus, Sparkles } from 'lucide-react';
import { money } from '../domain.js';
import { DEMO_ACCOUNTS } from './demoAccounts.js';
import { useWorkflow } from './InvestmentFlow.jsx';
import { demoAnswer } from './DemoAIAgent.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import './investor-ai-chat.css';

const prompts = ['Phân tích tài chính', 'Câu hỏi thẩm định', 'Rủi ro dòng tiền', 'Khám phá startup'];

function ChatCanvas({ messages, pending, ready, statusMessage, onSend, onNewChat, onOpenMenu, accountId, onSwitchAccount, isDemo }) {
  const [draft, setDraft] = useState('');
  const input = useRef(null);
  const log = useRef(null);
  const hasMessages = messages.length > 0;

  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, pending]);

  function submit(event) {
    event?.preventDefault();
    const question = draft.trim();
    if (!question || !ready || pending) return;
    onSend(question);
    setDraft('');
    input.current?.focus();
  }

  return <section className={`investor-ai-chat ${hasMessages ? 'has-messages' : ''}`} aria-label="AI Chat">
    <div className="investor-ai-atmosphere" aria-hidden="true"><span /><span /><span /></div>
    <header className="investor-ai-header">
      <div className="investor-ai-header-title"><button type="button" className="investor-ai-mobile-menu" aria-label="Mở menu" onClick={onOpenMenu}><Menu size={19} /></button><Sparkles size={16} aria-hidden="true" /><strong>2G2BT AI</strong><span className="investor-ai-header-separator" /><span>Trợ lý đầu tư</span></div>
      <div className="investor-ai-header-actions"><select className="investor-ai-account" aria-label="Chọn vai trò" value={accountId} onChange={event => onSwitchAccount(event.target.value)}>{DEMO_ACCOUNTS.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}</select><ThemeToggle/><button type="button" className="investor-ai-new" onClick={() => { onNewChat(); setDraft(''); input.current?.focus(); }} aria-label="Cuộc trò chuyện mới"><Plus size={16} /> <span>Cuộc trò chuyện mới</span></button></div>
    </header>

    <div className="investor-ai-body">
      {!hasMessages && <div className="investor-ai-welcome">
        <div className="investor-ai-symbol" aria-hidden="true"><span>2</span></div>
        <p className="investor-ai-eyebrow">2GOOD2BETRUE INTELLIGENCE</p>
        <h1>Mình có thể giúp gì cho bạn?</h1>
        <p className="investor-ai-intro">Đặt câu hỏi về tài chính, thẩm định hoặc cơ hội đầu tư.</p>
      </div>}
      {hasMessages && <div className="investor-ai-messages" role="log" aria-label="Cuộc trò chuyện với AI" aria-live="polite" ref={log}>
        {messages.map((message, index) => <article key={index} className={`investor-ai-message is-${message.role}`}>
          {message.role === 'assistant' && <span className="investor-ai-message-mark" aria-hidden="true">2</span>}
          <div className="investor-ai-message-content"><span className="sr-only">{message.role === 'user' ? 'Bạn: ' : 'AI: '}</span><p>{message.text}</p>
            {message.href && <a href={message.href}>{message.label}<ArrowUpRight size={14} /></a>}
            {message.tokenUsage && <small>{message.provider} · {message.model} · {money(message.tokenUsage.totalTokens)} token</small>}
          </div>
        </article>)}
        {pending && <p className="investor-ai-pending" role="status"><LoaderCircle size={16} className="animate-spin" />AI đang trả lời…</p>}
      </div>}

      <div className="investor-ai-input-wrap">
        {statusMessage && <p className="investor-ai-status" role="status">{statusMessage}</p>}
        <form className="investor-ai-composer" onSubmit={submit}>
          <textarea ref={input} aria-label="Tin nhắn cho AI" placeholder="Bạn muốn hỏi điều gì?" rows={2} maxLength={4000} value={draft} disabled={!ready || pending} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submit(); } }} />
          <div className="investor-ai-composer-foot"><span>{isDemo ? 'Trợ lý hướng dẫn' : 'Enter để gửi · Shift + Enter xuống dòng'}</span><button type="submit" aria-label="Gửi tin nhắn" disabled={!draft.trim() || !ready || pending}><ArrowUp size={18} /></button></div>
        </form>
        {!hasMessages && <div className="investor-ai-prompts">{prompts.map(prompt => <button type="button" key={prompt} disabled={!ready || pending} onClick={() => { setDraft(prompt); input.current?.focus(); }}>{prompt}<ArrowUpRight size={13} /></button>)}</div>}
        {!hasMessages && <p className="investor-ai-caption">Câu trả lời cần được kiểm chứng trước khi đưa ra quyết định đầu tư.</p>}
      </div>
    </div>
  </section>;
}

export function DemoInvestorAIChat({ state, onOpenMenu, accountId, onSwitchAccount }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => { setMessages([]); }, [state.role]);
  function send(question) {
    const reply = demoAnswer(question, state);
    setMessages(current => [...current, { role: 'user', text: question }, { role: 'assistant', ...reply }]);
  }
  return <ChatCanvas messages={messages} pending={false} ready statusMessage="" onSend={send} onNewChat={() => setMessages([])} onOpenMenu={onOpenMenu} accountId={accountId} onSwitchAccount={onSwitchAccount} isDemo />;
}

export function LiveInvestorAIChat({ state, onOpenMenu, accountId, onSwitchAccount }) {
  const { snapshot, status, aiStatus, api, refresh } = useWorkflow();
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const sequence = useRef(0);
  const actor = snapshot?.user?.id;
  const ready = status === 'ready' && snapshot?.user?.role === state.role && Boolean(aiStatus?.configured);

  useEffect(() => { sequence.current++; setMessages([]); setPending(false); setError(''); }, [actor, state.role]);
  async function send(question) {
    if (!ready || pending) return;
    const run = ++sequence.current;
    setPending(true); setError('');
    setMessages(current => [...current, { role: 'user', text: question }]);
    try {
      const data = await api('/api/ai/chat', { method: 'POST', body: { question } });
      if (run !== sequence.current) return;
      const reply = data?.reply;
      if (!reply || typeof reply.text !== 'string' || !reply.text.trim() || !reply.tokenUsage || !Number.isFinite(reply.tokenUsage.totalTokens)) throw new Error('API chưa trả về câu trả lời và lượng token hợp lệ.');
      setMessages(current => [...current, { role: 'assistant', text: reply.text, tokenUsage: reply.tokenUsage, model: reply.model, provider: reply.provider }]);
    } catch (reason) { if (run === sequence.current) setError(reason.message || 'Không nhận được câu trả lời từ AI.'); }
    finally { if (run === sequence.current) { await refresh(); setPending(false); } }
  }
  const statusMessage = error || (!ready ? status === 'loading' ? 'Đang thiết lập phiên làm việc…' : aiStatus?.message || 'Dịch vụ AI chưa được cấu hình.' : '');
  return <ChatCanvas messages={messages} pending={pending} ready={ready} statusMessage={statusMessage} onSend={send} onNewChat={() => { sequence.current++; setMessages([]); setPending(false); setError(''); }} onOpenMenu={onOpenMenu} accountId={accountId} onSwitchAccount={onSwitchAccount} isDemo={false} />;
}
