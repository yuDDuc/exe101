const examples = [
  { id:'demo-tai-sinh-nong', name:'Tái Sinh Nông', industry:'Climate Tech', stage:'Pre-seed', location:'Cần Thơ', target:1800, goal:'Thử nghiệm mô hình thu gom phụ phẩm nông nghiệp và chuyển thành vật liệu sinh học.', summary:'Hồ sơ demo: nền tảng kết nối hợp tác xã với đơn vị tái chế phụ phẩm nông nghiệp thành vật liệu đóng gói sinh học. Mọi thông tin trong hồ sơ đều là giả lập để trình diễn sản phẩm.', market:'Thị trường mô phỏng: bao bì bền vững và xử lý phụ phẩm nông nghiệp tại Đồng bằng sông Cửu Long.' },
  { id:'demo-so-may', name:'Sổ Mây', industry:'SaaS', stage:'Seed', location:'TP. Hồ Chí Minh', target:3200, goal:'Xây dựng công cụ quản trị dòng tiền cho doanh nghiệp nhỏ.', summary:'Hồ sơ demo: phần mềm giúp cửa hàng và doanh nghiệp nhỏ theo dõi thu chi, hóa đơn và dự báo dòng tiền trong một giao diện. Đây là doanh nghiệp giả lập, chưa có số liệu hoạt động thật.', market:'Thị trường mô phỏng: phần mềm quản trị tài chính cho doanh nghiệp nhỏ tại Việt Nam.' },
  { id:'demo-bac-si-so', name:'Bác Sĩ Số', industry:'Healthtech', stage:'Pre-seed', location:'Hà Nội', target:2400, goal:'Thiết kế nền tảng hỗ trợ phòng khám quản lý lịch hẹn và chăm sóc sau khám.', summary:'Hồ sơ demo: giải pháp quản lý lịch hẹn, nhắc tái khám và hồ sơ chăm sóc cơ bản cho phòng khám độc lập. Dữ liệu chỉ dùng minh họa, không mô tả cơ sở y tế có thật.', market:'Thị trường mô phỏng: công cụ vận hành dành cho phòng khám quy mô nhỏ và vừa.' },
  { id:'demo-cho-nong', name:'Chợ Nông', industry:'E-commerce', stage:'Seed', location:'Đà Lạt', target:2800, goal:'Thử nghiệm kênh đặt hàng trực tiếp giữa nông hộ và bếp ăn tập thể.', summary:'Hồ sơ demo: sàn đặt hàng nông sản theo mùa, giúp bếp ăn lập kế hoạch mua hàng và nông hộ nhận nhu cầu trước vụ thu hoạch. Các con số và doanh nghiệp trong hồ sơ đều là giả lập.', market:'Thị trường mô phỏng: chuỗi cung ứng nông sản tươi cho nhà hàng và bếp ăn.' },
  { id:'demo-hoc-5-phut', name:'Học 5 Phút', industry:'Edtech', stage:'Pre-seed', location:'Đà Nẵng', target:1500, goal:'Phát triển thư viện bài học ngắn cho kỹ năng nghề nghiệp số.', summary:'Hồ sơ demo: ứng dụng học theo bài ngắn, có lộ trình thực hành về kỹ năng số cho người đi làm. Nội dung hồ sơ là mô phỏng và không đại diện cho kết quả đào tạo thật.', market:'Thị trường mô phỏng: học trực tuyến linh hoạt cho người đi làm và sinh viên năm cuối.' },
  { id:'demo-dien-sach', name:'Điện Sạch', industry:'Climate Tech', stage:'Series A', location:'Bình Dương', target:6500, goal:'Mở rộng phần mềm theo dõi tiêu thụ điện cho nhà xưởng.', summary:'Hồ sơ demo: bảng điều khiển giúp nhà xưởng quan sát mức tiêu thụ điện theo khu vực và lập kế hoạch tiết kiệm năng lượng. Hồ sơ và dữ liệu hoàn toàn giả lập.', market:'Thị trường mô phỏng: quản lý năng lượng cho cơ sở sản xuất và kho vận.' },
  { id:'demo-vi-mo', name:'Ví Mở', industry:'Fintech', stage:'Seed', location:'TP. Hồ Chí Minh', target:4000, goal:'Xây dựng công cụ quản lý thu chi và đối soát cho hộ kinh doanh.', summary:'Hồ sơ demo: công cụ gom giao dịch từ nhiều kênh bán hàng để hộ kinh doanh theo dõi thu chi và đối soát cuối ngày. Đây là ví dụ mô phỏng, không xử lý giao dịch thật.', market:'Thị trường mô phỏng: công cụ vận hành tài chính cho hộ kinh doanh.' },
  { id:'demo-kho-noi', name:'Kho Nối', industry:'SaaS', stage:'Seed', location:'Hải Phòng', target:3500, goal:'Kết nối nhu cầu lưu kho ngắn hạn với công suất kho còn trống.', summary:'Hồ sơ demo: phần mềm đăng ký, tìm kiếm và quản lý công suất kho ngắn hạn cho doanh nghiệp vừa và nhỏ. Mọi thông tin về sản phẩm và doanh nghiệp đều là giả lập.', market:'Thị trường mô phỏng: dịch vụ kho bãi linh hoạt cho bán lẻ và sản xuất.' },
  { id:'demo-vat-lieu-moi', name:'Vật Liệu Mới', industry:'Climate Tech', stage:'Pre-seed', location:'Huế', target:2100, goal:'Thử nghiệm quy trình tái sử dụng vật liệu xây dựng sau tháo dỡ.', summary:'Hồ sơ demo: danh mục vật liệu thu hồi, phân loại và kết nối với đơn vị có nhu cầu tái sử dụng trong công trình. Không có dự án hay đối tác thật nào được mô tả ở đây.', market:'Thị trường mô phỏng: vật liệu xây dựng tuần hoàn và giảm phế thải công trình.' },
  { id:'demo-bep-gan', name:'Bếp Gần', industry:'E-commerce', stage:'Seed', location:'Nha Trang', target:2600, goal:'Tạo kênh đặt nguyên liệu định kỳ cho nhà hàng địa phương.', summary:'Hồ sơ demo: công cụ đặt hàng theo lịch cho nhà hàng, kết nối nhu cầu nguyên liệu với nhà cung cấp địa phương. Hồ sơ này chỉ để minh họa tính năng Marketplace.', market:'Thị trường mô phỏng: cung ứng nguyên liệu cho nhà hàng độc lập.' },
];

export function createDemoMarketplace(stamp) {
  return examples.map(({ id, name, industry, stage, location, target, goal, summary, market }) => ({
    id,
    ownerId:'founder',
    name,
    goal,
    profile:{ name, industry, stage, location, summary, target, fundingRoundIndex:null, fundingRoundTotal:null, raised:null, traction:'Chưa có dữ liệu hoạt động xác minh; hồ sơ demo.', customerReferences:'', market, team:'', teamRoster:{ leader:null, coLeader:null, members:[] }, useOfFunds:'' },
    published:true,
    publishedAt:stamp,
    financial:null,
    diligence:{},
    createdAt:stamp,
    updatedAt:stamp,
    isDemo:true,
  }));
}
