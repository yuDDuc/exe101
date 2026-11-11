const startups = [
  { id:'startup-tai-sinh-nong', name:'Tái Sinh Nông', industry:'Climate Tech', stage:'Pre-seed', location:'Cần Thơ', target:1800, goal:'Mở rộng thu gom phụ phẩm nông nghiệp và sản xuất vật liệu đóng gói sinh học.', summary:'Nền tảng kết nối hợp tác xã với đơn vị tái chế phụ phẩm nông nghiệp thành vật liệu đóng gói sinh học, hướng tới chuỗi cung ứng tuần hoàn.', market:'Khách hàng mục tiêu: hợp tác xã lúa gạo, nhà sản xuất bao bì và doanh nghiệp thực phẩm tại Đồng bằng sông Cửu Long.' },
  { id:'startup-so-may', name:'Sổ Mây', industry:'SaaS', stage:'Seed', location:'TP. Hồ Chí Minh', target:3200, goal:'Mở rộng công cụ quản trị dòng tiền cho doanh nghiệp nhỏ.', summary:'Phần mềm giúp cửa hàng và doanh nghiệp nhỏ theo dõi thu chi, hóa đơn và dự báo dòng tiền trên một giao diện.', market:'Khách hàng mục tiêu: doanh nghiệp nhỏ, cửa hàng bán lẻ và đơn vị cung cấp dịch vụ.' },
  { id:'startup-bac-si-so', name:'Bác Sĩ Số', industry:'Healthtech', stage:'Pre-seed', location:'Hà Nội', target:2400, goal:'Hoàn thiện nền tảng quản lý lịch hẹn và chăm sóc sau khám cho phòng khám.', summary:'Giải pháp quản lý lịch hẹn, nhắc tái khám và hồ sơ chăm sóc cơ bản cho phòng khám độc lập.', market:'Khách hàng mục tiêu: phòng khám đa khoa, chuyên khoa và trung tâm chăm sóc sức khỏe.' },
  { id:'startup-cho-nong', name:'Chợ Nông', industry:'E-commerce', stage:'Seed', location:'Đà Lạt', target:2800, goal:'Mở rộng kênh đặt hàng trực tiếp giữa nông hộ và bếp ăn tập thể.', summary:'Sàn đặt hàng nông sản theo mùa, giúp bếp ăn lập kế hoạch mua hàng và nông hộ nhận nhu cầu trước vụ thu hoạch.', market:'Khách hàng mục tiêu: nhà hàng, bếp ăn tập thể, hợp tác xã và trang trại.' },
  { id:'startup-hoc-5-phut', name:'Học 5 Phút', industry:'Edtech', stage:'Pre-seed', location:'Đà Nẵng', target:1500, goal:'Phát triển thư viện bài học ngắn về kỹ năng nghề nghiệp số.', summary:'Ứng dụng học theo bài ngắn với lộ trình thực hành kỹ năng số dành cho người đi làm.', market:'Khách hàng mục tiêu: người đi làm, sinh viên năm cuối và doanh nghiệp đào tạo nội bộ.' },
  { id:'startup-dien-sach', name:'Điện Sạch', industry:'Climate Tech', stage:'Series A', location:'Bình Dương', target:6500, goal:'Mở rộng phần mềm theo dõi tiêu thụ điện cho nhà xưởng.', summary:'Bảng điều khiển giúp nhà xưởng theo dõi mức tiêu thụ điện theo khu vực và lập kế hoạch tiết kiệm năng lượng.', market:'Khách hàng mục tiêu: cơ sở sản xuất, khu công nghiệp và đơn vị vận hành kho vận.' },
  { id:'startup-vi-mo', name:'Ví Mở', industry:'Fintech', stage:'Seed', location:'TP. Hồ Chí Minh', target:4000, goal:'Mở rộng công cụ quản lý thu chi và đối soát cho hộ kinh doanh.', summary:'Công cụ tổng hợp giao dịch từ nhiều kênh bán hàng để hộ kinh doanh theo dõi thu chi và đối soát cuối ngày.', market:'Khách hàng mục tiêu: cửa hàng bán lẻ, hộ kinh doanh và đơn vị bán hàng đa kênh.' },
  { id:'startup-kho-noi', name:'Kho Nối', industry:'SaaS', stage:'Seed', location:'Hải Phòng', target:3500, goal:'Kết nối nhu cầu lưu kho ngắn hạn với công suất kho còn trống.', summary:'Phần mềm đăng ký, tìm kiếm và quản lý công suất kho ngắn hạn cho doanh nghiệp vừa và nhỏ.', market:'Khách hàng mục tiêu: doanh nghiệp bán lẻ, nhà sản xuất và đơn vị logistics.' },
  { id:'startup-vat-lieu-moi', name:'Vật Liệu Mới', industry:'Climate Tech', stage:'Pre-seed', location:'Huế', target:2100, goal:'Mở rộng quy trình tái sử dụng vật liệu xây dựng sau tháo dỡ.', summary:'Danh mục vật liệu thu hồi, phân loại và kết nối với đơn vị có nhu cầu tái sử dụng trong công trình.', market:'Khách hàng mục tiêu: nhà thầu, đơn vị thiết kế và doanh nghiệp cung ứng vật liệu xây dựng.' },
  { id:'startup-bep-gan', name:'Bếp Gần', industry:'E-commerce', stage:'Seed', location:'Nha Trang', target:2600, goal:'Mở rộng kênh đặt nguyên liệu định kỳ cho nhà hàng địa phương.', summary:'Công cụ đặt hàng theo lịch cho nhà hàng, kết nối nhu cầu nguyên liệu với nhà cung cấp địa phương.', market:'Khách hàng mục tiêu: nhà hàng độc lập, bếp ăn và nhà cung cấp thực phẩm địa phương.' },
];

const details = {
  'startup-tai-sinh-nong': { fundingRoundIndex:1, fundingRoundTotal:4, raised:420, traction:'Đã khảo sát 12 hợp tác xã và hoàn thành 3 lô thử nghiệm vật liệu; doanh thu thương mại chưa được công bố.', customerReferences:'HTX Đồng Xanh\nBao Bì Mekong', team:'Đội ngũ kết hợp kinh nghiệm về chuỗi cung ứng nông nghiệp, vật liệu sinh học và vận hành sản phẩm.', useOfFunds:'Thử nghiệm vật liệu sinh học (40%)\nThiết bị thu gom và sơ chế (30%)\nPhát triển sản phẩm (20%)\nPháp lý và vận hành (10%)' },
  'startup-so-may': { fundingRoundIndex:2, fundingRoundTotal:4, raised:900, traction:'Chuẩn bị chương trình thử nghiệm với 80 cửa hàng bán lẻ; tập trung vào đối soát và dự báo dòng tiền.', customerReferences:'An Phúc Retail\nMinh Tâm Mart', team:'Đội ngũ có kinh nghiệm về sản phẩm SaaS, kế toán doanh nghiệp nhỏ và bảo mật dữ liệu.', useOfFunds:'Phát triển sản phẩm và bảo mật (40%)\nTích hợp hóa đơn, ngân hàng (25%)\nBán hàng và hỗ trợ khách hàng (25%)\nPháp lý, vận hành (10%)' },
  'startup-bac-si-so': { fundingRoundIndex:1, fundingRoundTotal:4, raised:300, traction:'Quy trình triển khai tại 5 phòng khám, với năng lực mục tiêu 2.000 lịch hẹn mỗi tháng.', customerReferences:'Phòng khám An Khang\nPhòng khám Hồng Mai', team:'Đội ngũ chuyên môn về vận hành phòng khám, phát triển phần mềm y tế và bảo vệ dữ liệu.', useOfFunds:'Hoàn thiện sản phẩm và an toàn dữ liệu (40%)\nThử nghiệm quy trình (25%)\nTích hợp hệ thống (20%)\nVận hành và pháp lý (15%)' },
  'startup-cho-nong': { fundingRoundIndex:2, fundingRoundTotal:4, raised:700, traction:'Kết nối 25 nhà cung cấp nông sản với 40 bếp ăn; tập trung vào đơn hàng theo mùa và logistics lạnh.', customerReferences:'Bếp Nhà Mộc\nNông Trại Đồi Xanh', team:'Đội ngũ có kinh nghiệm về thu mua nông sản, logistics lạnh và thương mại điện tử.', useOfFunds:'Sản phẩm và công cụ đặt hàng (35%)\nKiểm soát chất lượng (25%)\nLogistics và chuỗi lạnh (25%)\nPhát triển thị trường (15%)' },
  'startup-hoc-5-phut': { fundingRoundIndex:1, fundingRoundTotal:4, raised:150, traction:'Hoàn thiện 40 bài học chuyên môn và lộ trình học 6 tuần dành cho kỹ năng số.', customerReferences:'Cao đẳng Sao Việt\nTrung tâm Hướng Dương', team:'Đội ngũ chuyên môn về thiết kế học liệu, công nghệ giáo dục và đo lường kết quả học tập.', useOfFunds:'Sản xuất học liệu (35%)\nPhát triển nền tảng (30%)\nHợp tác chuyên gia (20%)\nVận hành và kiểm định nội dung (15%)' },
  'startup-dien-sach': { fundingRoundIndex:3, fundingRoundTotal:4, raised:3200, traction:'Kế hoạch triển khai tại 12 nhà xưởng, đặt mục tiêu tiết kiệm điện trung bình 8% mỗi năm.', customerReferences:'Nhà máy Nam Phát\nKhu công nghiệp Bình An', team:'Đội ngũ chuyên môn về quản lý năng lượng, IoT công nghiệp và phân tích dữ liệu.', useOfFunds:'Triển khai thiết bị đo (35%)\nPhát triển phân tích năng lượng (30%)\nĐội ngũ triển khai (20%)\nVận hành và chứng nhận (15%)' },
  'startup-vi-mo': { fundingRoundIndex:2, fundingRoundTotal:4, raised:600, traction:'Tích hợp 3 kênh thanh toán và chuẩn bị chương trình triển khai với 50 cửa hàng.', customerReferences:'Cửa hàng Tâm An\nMộc Gia Store', team:'Đội ngũ chuyên môn về sản phẩm fintech, đối soát thanh toán và quản trị rủi ro.', useOfFunds:'Tích hợp và bảo mật (35%)\nPhát triển sản phẩm (30%)\nHỗ trợ hộ kinh doanh (20%)\nTuân thủ và vận hành (15%)' },
  'startup-kho-noi': { fundingRoundIndex:2, fundingRoundTotal:4, raised:840, traction:'Danh mục kết nối 15 kho với tổng công suất chào thuê 4.000 m²; ưu tiên hợp đồng lưu kho ngắn hạn.', customerReferences:'Kho Nam Dương\nKho Hạ Long', team:'Đội ngũ có kinh nghiệm về vận hành kho, logistics và phát triển phần mềm doanh nghiệp.', useOfFunds:'Nền tảng quản lý kho (35%)\nTích hợp dữ liệu và định vị (25%)\nPhát triển đối tác (25%)\nVận hành (15%)' },
  'startup-vat-lieu-moi': { fundingRoundIndex:1, fundingRoundTotal:4, raised:210, traction:'Hoàn thiện quy trình phân loại 6 nhóm vật liệu và chuẩn bị triển khai tại 2 công trình.', customerReferences:'Công trình Vĩnh An\nAn Phú Materials', team:'Đội ngũ chuyên môn về kỹ thuật vật liệu, thiết kế tuần hoàn và quản lý công trình.', useOfFunds:'Kiểm định vật liệu (35%)\nPhát triển danh mục và truy xuất (25%)\nThử nghiệm quy trình (25%)\nPháp lý và vận hành (15%)' },
  'startup-bep-gan': { fundingRoundIndex:2, fundingRoundTotal:4, raised:520, traction:'Kết nối 30 nhà hàng với 20 nhà cung cấp, tập trung vào đơn hàng định kỳ và nguồn nguyên liệu địa phương.', customerReferences:'Bếp Nhà Mộc\nNhà hàng Cát Biển', team:'Đội ngũ chuyên môn về vận hành nhà hàng, thương mại điện tử và chuỗi cung ứng thực phẩm.', useOfFunds:'Sản phẩm đặt hàng định kỳ (35%)\nPhát triển nhà cung cấp (25%)\nKiểm soát chất lượng (20%)\nHỗ trợ và vận hành (20%)' },
};

const teams = {
  'startup-tai-sinh-nong': [['Nguyễn Gia Hân','CEO · Chuỗi cung ứng'],['Võ Minh Trí','CTO · Vật liệu sinh học'],['Lê Quốc Bảo','COO · Vận hành nông nghiệp']],
  'startup-so-may': [['Trần Thanh Tùng','CEO · Sản phẩm SaaS'],['Lê Phương Nhi','CTO · Nền tảng dữ liệu'],['Nguyễn Hải Yến','CFO · Kế toán doanh nghiệp']],
  'startup-bac-si-so': [['Phạm Hoàng Long','CEO · Vận hành y tế'],['Đặng Minh Châu','CTO · Phần mềm y tế'],['Trần Thu Hà','COO · Chăm sóc khách hàng']],
  'startup-cho-nong': [['Nguyễn Bảo Anh','CEO · Phát triển thị trường'],['Lê Quốc Huy','CTO · Thương mại điện tử'],['Phan Thanh Tâm','COO · Logistics lạnh']],
  'startup-hoc-5-phut': [['Võ Khánh Linh','CEO · Thiết kế học tập'],['Trần Đức Anh','CTO · Nền tảng Edtech'],['Nguyễn Bích Ngọc','COO · Học liệu']],
  'startup-dien-sach': [['Lê Nhật Minh','CEO · Hiệu quả năng lượng'],['Phạm Hương Giang','CTO · IoT công nghiệp'],['Đỗ Quốc Khánh','COO · Triển khai nhà xưởng']],
  'startup-vi-mo': [['Nguyễn Tuấn Kiệt','CEO · Sản phẩm Fintech'],['Trịnh Ngọc Lan','CTO · Thanh toán'],['Bùi Minh Tài','CRO · Quản trị rủi ro']],
  'startup-kho-noi': [['Hoàng Gia Bảo','CEO · Logistics'],['Phan Minh Châu','CTO · Phần mềm kho vận'],['Lê Đức Duy','COO · Kết nối kho']],
  'startup-vat-lieu-moi': [['Đặng Thảo Vy','CEO · Kinh tế tuần hoàn'],['Trần Gia Hưng','CTO · Kỹ thuật vật liệu'],['Nguyễn Nhật Anh','COO · Công trình']],
  'startup-bep-gan': [['Lê Hoàng Yến','CEO · Vận hành nhà hàng'],['Nguyễn Mạnh Hùng','CTO · Thương mại điện tử'],['Võ Thu Trang','COO · Chuỗi cung ứng']],
};

function startupTeam(id) {
  const [leader, coLeader, member]=teams[id];
  const biography='Phụ trách phát triển sản phẩm, phối hợp đối tác và triển khai kế hoạch tăng trưởng.';
  const person=([name,title])=>({name,title,bio:biography});
  return {leader:person(leader),coLeader:person(coLeader),members:[person(member)]};
}

export function createMarketplaceStartups(stamp) {
  return startups.map(({ id, name, industry, stage, location, target, goal, summary, market }) => ({
    id,
    ownerId:'founder',
    name,
    goal,
    profile:{ name, industry, stage, location, summary, target, ...details[id], market, teamRoster:startupTeam(id) },
    published:true,
    publishedAt:stamp,
    financial:null,
    diligence:{},
    createdAt:stamp,
    updatedAt:stamp,
    catalogListing:true,
  }));
}

export const LEGACY_MARKETPLACE_IDS = Object.freeze(Object.fromEntries(startups.map(({id})=>[`demo-${id.slice('startup-'.length)}`,id])));
