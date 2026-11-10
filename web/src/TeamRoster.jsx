import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const initials = name => name?.replace(/\s*\(.*?\)/g, '').trim().split(/\s+/).slice(-2).map(part => part[0]).join('').toUpperCase() || '?';

function Person({ person, role }) {
  const name = person.name.trim();
  const bio = person.bio || '';
  return <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
    <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{initials(person.name)}</span>
    <div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-wide text-indigo-600">{role}</p><strong className="mt-0.5 block break-words text-sm text-slate-900">{name}</strong><p className="mt-0.5 text-xs text-slate-500">{person.title}</p>{bio && <p className="mt-2 text-xs leading-5 text-slate-600">{bio}</p>}</div>
  </div>;
}

export function TeamRoster({ roster, fallback = '', wide = false }) {
  const [expanded, setExpanded] = useState(false);
  const members = roster?.members || [];
  if (!roster?.leader && !roster?.coLeader) return <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">{fallback || 'Startup chưa cung cấp người phụ trách.'}</p>;
  return <div>
    <div className={wide ? 'grid gap-3 sm:grid-cols-2' : 'space-y-2'}>{roster.leader && <Person person={roster.leader} role="Leader" />}{roster.coLeader && <Person person={roster.coLeader} role="Co-leader" />}</div>
    {members.length > 0 && <><button type="button" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? 'Ẩn thành viên chủ chốt' : `Xem thêm ${members.length} thành viên chủ chốt`}{expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</button>{expanded && <div className={wide ? 'mt-3 grid gap-3 sm:grid-cols-2' : 'mt-3 space-y-2'}>{members.map((person, index) => <Person key={`${person.name}-${index}`} person={person} role="Thành viên chủ chốt" />)}</div>}</>}
  </div>;
}

const fieldClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400';
const blankMember = () => ({ name: '', title: '', bio: '' });

export function TeamRosterEditor({ roster }) {
  const [members, setMembers] = useState(() => (roster?.members || []).map(member => ({ ...member })));
  function changeMember(index, field, value) { setMembers(current => current.map((member, position) => position === index ? { ...member, [field]: value } : member)); }
  return <details className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <summary className="cursor-pointer text-sm font-semibold text-slate-800">Người phụ trách công khai: Leader, Co-leader và thành viên chủ chốt</summary>
    <p className="mt-2 text-xs leading-5 text-slate-500">Chỉ nhập tên và tiểu sử đã được người trong nhóm đồng ý công bố. Để trống khi chưa xác nhận.</p>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">{[['leader', 'Leader'], ['coLeader', 'Co-leader']].map(([key, label]) => <div key={key} className="space-y-2 rounded-lg border border-slate-200 bg-white p-3"><h4 className="text-sm font-semibold text-slate-800">{label}</h4><label className="block text-xs text-slate-600">Tên<input className={fieldClass} name={`${key}Name`} maxLength={100} defaultValue={roster?.[key]?.name || ''} /></label><label className="block text-xs text-slate-600">Chức danh<input className={fieldClass} name={`${key}Title`} maxLength={120} defaultValue={roster?.[key]?.title || ''} /></label><label className="block text-xs text-slate-600">Giới thiệu ngắn<textarea className={fieldClass} name={`${key}Bio`} maxLength={500} rows={2} defaultValue={roster?.[key]?.bio || ''} /></label></div>)}</div>
    <div className="mt-5"><div className="flex items-center justify-between gap-3"><h4 className="text-sm font-semibold text-slate-800">Thành viên chủ chốt khác</h4><button type="button" disabled={members.length >= 8} onClick={() => setMembers(current => [...current, blankMember()])} className="text-xs font-semibold text-indigo-600 disabled:opacity-40">+ Thêm người</button></div><div className="mt-3 space-y-3">{members.map((member, index) => <div key={index} className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-2"><label className="text-xs text-slate-600">Tên<input className={fieldClass} name={`member${index}Name`} maxLength={100} value={member.name} onChange={event => changeMember(index, 'name', event.target.value)} /></label><label className="text-xs text-slate-600">Chức danh<input className={fieldClass} name={`member${index}Title`} maxLength={120} value={member.title} onChange={event => changeMember(index, 'title', event.target.value)} /></label><label className="text-xs text-slate-600 sm:col-span-2">Giới thiệu ngắn<textarea className={fieldClass} name={`member${index}Bio`} maxLength={500} rows={2} value={member.bio} onChange={event => changeMember(index, 'bio', event.target.value)} /></label><button type="button" onClick={() => setMembers(current => current.filter((_, position) => position !== index))} className="justify-self-start text-xs font-medium text-rose-600">Xóa người này</button></div>)}</div></div>
  </details>;
}

export function rosterFromForm(form) {
  const person = key => {
    const name = String(form.get(`${key}Name`) || '').trim();
    const title = String(form.get(`${key}Title`) || '').trim();
    const bio = String(form.get(`${key}Bio`) || '').trim();
    return name ? { name, title, bio } : null;
  };
  const members = [];
  for (let index = 0; index < 8; index++) {
    const item = person(`member${index}`);
    if (item) members.push(item);
  }
  return { leader: person('leader'), coLeader: person('coLeader'), members };
}
