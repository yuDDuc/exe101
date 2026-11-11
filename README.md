# X / 2good2betrue (2G2BT)

[Bản đồ project & tìm nhanh tệp](docs/PROJECT-GRAPH.md) · [Sơ đồ tệp tương tác](docs/PROJECT-GRAPH.html)

Mã nguồn ứng dụng 2GOOD2BETRUE kết nối Startup với Nhà đầu tư, xây bằng React, Tailwind và Node.js. Giao diện có chế độ sáng và tối.

**GitHub lưu mã nguồn, không tự chạy website hoặc API.** Nhánh `main` của repo này chứa bản đang phát triển. Để xem trên máy, chạy theo hướng dẫn bên dưới. Để có URL công khai chạy được cả API, cần triển khai Web Service từ **repo này** theo [hướng dẫn Render](docs/HOST-RENDER.md). Bản Cloudflare ở dưới là một deployment riêng và không tự cập nhật khi push GitHub.

App hiện có hai luồng: URL mặc định chạy với API máy chủ; `?mode=demo` là bản thử lưu một phần dữ liệu trong trình duyệt. Phần case trên máy chủ mới cho tạo nháp và gửi vào trạng thái **chờ cấu hình phí**; chưa thu tiền, giao mentor hoặc công bố case cho Investor. Xem [trạng thái luồng case](docs/WORKFLOW-CASE-PRODUCTION.md).

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FyuDDuc%2Fexe101)

## Bản dự phòng Cloudflare Free

[Website dự phòng](https://x-workspace-backup.x-workspace.workers.dev) chạy độc lập cả React, API ModelAPI và dữ liệu SQLite Durable Object. Mở link trực tiếp, không cần mật khẩu. Đã xác minh tài khoản Workers ở Free. ModelAPI vẫn tính phí riêng.

[Hướng dẫn Cloudflare và sao lưu dữ liệu](docs/HOST-CLOUDFLARE.md). Hai site là hai bản dữ liệu độc lập sau khi sao chép, chưa tự đồng bộ liên tục.

## Host demo miễn phí khoảng một tuần

Blueprint `render.yaml` chọn **Render Free Web Service**, region Singapore. Kết nối GitHub, nhập `AI_API_KEY` trong Render, deploy rồi mở URL được cấp. Bản chia sẻ công khai mở trực tiếp không cần mật khẩu (`PUBLIC_DEMO=true`). Việc đổi gói bị khóa phía máy chủ để giữ ngân sách AI trong hạn mức Free.

**Hosting miễn phí không bao gồm phí ModelAPI.** Render Free ngủ khi không có truy cập và không giữ file dữ liệu qua restart/redeploy. Bản này phù hợp demo bằng dữ liệu mẫu; cần database ngoài để giữ dữ liệu và hạn mức xuyên suốt tuần.

[Hướng dẫn deploy từng bước](docs/HOST-RENDER.md) · [Chạy và kiểm thử app](web/README.md) · [Thiết kế gói dịch vụ](docs/GOI-DICH-VU.md)

## Luồng chính

Startup tạo workspace → công bố giới thiệu → Nhà đầu tư xin quyền → Startup duyệt → xem tài chính, phân tích AI và trao đổi → ghi nhận/theo dõi khoản đầu tư.

- Chỉ Startup được tạo workspace. Quyền xem tài chính, tin nhắn và báo cáo được kiểm tra trên API.
- AI Financial Analysis và AI Agent gọi API ModelAPI thật từ server, ghi nhận token thực tế. Khóa không nằm trong frontend.
- Hai bộ gói theo vai trò. Token Free cấp một lần; gói trả phí reset mỗi thứ Hai giờ Việt Nam. Nâng cấp gói hiện là dùng thử, chưa thu tiền thuê bao.
- Đây là môi trường hai tài khoản demo dùng chung máy chủ, không cần mật khẩu truy cập site; chưa phải hệ thống đăng nhập nhiều người dùng để vận hành công khai.

## Chạy trên máy

```bash
cd web
npm ci
# Copy .env.example thành .env, nhập AI_API_KEY ở phía server
npm start
```

Mở `http://127.0.0.1:5180`. Chọn **Startup demo** hoặc **Nhà đầu tư demo** ở thanh trên cùng.

```bash
npm test
npm run test:server
npm run test:e2e
npm run build
npm run start:prod
```

Production server dùng `PORT` (mặc định 10000), phục vụ riêng `web/dist` và `/api`. Khi deploy Render, `RENDER_EXTERNAL_URL` được dùng tự động để chấp nhận đúng hostname của site.

Không commit `.env`, API key, dữ liệu `.runtime/`, thư mục `node_modules/` hoặc bản build `dist/`.
