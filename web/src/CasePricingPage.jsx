import React from 'react';
import { CASE_CONNECTION_SHARE_VND, CASE_CONNECTION_TOTAL_VND, CASE_LISTING_FEE_VND } from './caseWorkflow.js';

const money = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';

export function CasePricingPage({ showCaseLink = true }) {
  return <div className="mx-auto max-w-5xl space-y-6">
    <header><p className="text-xs font-semibold uppercase tracking-[.18em] text-indigo-600">MÔ HÌNH PHÍ STARTUP</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Startup trả theo case</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Startup không cần mua gói thuê bao để đăng case. Phí đăng được tính cố định theo từng case; giá chính thức chưa chốt.</p></header>
    <div className="grid gap-5 md:grid-cols-2">
      <section className="rounded-2xl border border-indigo-200 bg-white p-6"><span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Đăng một case</span><h2 className="mt-3 text-2xl font-bold text-slate-900">{CASE_LISTING_FEE_VND === null ? 'Giá chưa chốt' : money(CASE_LISTING_FEE_VND)}</h2><p className="mt-3 text-sm leading-6 text-slate-600">Giá sẽ được cấu hình trước khi mở thanh toán. Hiện chưa thu phí đăng case.</p>{showCaseLink ? <a href="#/cases" className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Đi tới case</a> : <p className="mt-5 text-sm text-slate-500">Chức năng đăng case chưa mở. Bạn có thể chuẩn bị hồ sơ trong Workspace dự án.</p>}</section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Kết nối một case</span><h2 className="mt-3 text-2xl font-bold text-slate-900">{money(CASE_CONNECTION_TOTAL_VND)} tổng cộng</h2><p className="mt-3 text-sm leading-6 text-slate-600">Sau khi Startup đồng ý kết nối, Startup và investor mỗi bên trả {money(CASE_CONNECTION_SHARE_VND)}. Trao đổi chỉ mở khi cả hai bên hoàn tất phần của mình.</p></section>
    </div>
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900"><strong>AI không tính phí theo lượt cho người dùng.</strong> Hạn mức AI dùng để quản lý tài nguyên; đây không phải bảng giá token. Thanh toán chưa được mở.</section>
  </div>;
}
