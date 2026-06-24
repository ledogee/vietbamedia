type Language = 'vi' | 'en';

const serviceSeo = {
  vi: {
    communications: {
      title: 'Tư vấn Chiến lược Truyền thông Tổng thể | VietBa Group',
      description: 'VietBa Group tư vấn chiến lược truyền thông tổng thể, định vị thương hiệu, quản trị danh tiếng và xử lý khủng hoảng hiệu quả cho doanh nghiệp.',
    },
    technology: {
      title: 'Công nghệ & Chuyển đổi số Doanh nghiệp | VietBa Group',
      description: 'VietBa Group cung cấp giải pháp chuyển đổi số, AI, phần mềm doanh nghiệp, thương mại điện tử, hạ tầng và bảo mật công nghệ thông tin toàn diện.',
    },
    production: {
      title: 'Sản xuất Content Đa nền tảng Chuyên nghiệp | VietBa Group',
      description: 'VietBa Group sản xuất TVC, gameshow, phim ngắn, viral clip và nội dung số đa nền tảng với kinh nghiệm sáng tạo, sản xuất truyền hình chuyên nghiệp.',
    },
    digital: {
      title: 'Dịch vụ Digital Marketing & Performance | VietBa Group',
      description: 'VietBa Group triển khai Digital Marketing tổng thể gồm SEO, SEM, social media, content marketing và quảng cáo hiệu suất đa nền tảng cho doanh nghiệp.',
    },
    booking: {
      title: 'Booking Media, Báo chí, Truyền hình & KOL | VietBa Group',
      description: 'Dịch vụ booking media đa kênh của VietBa Group kết nối truyền hình, phát thanh, báo chí, KOL, influencer và hệ thống quảng cáo trên toàn quốc.',
    },
    ooh: {
      title: 'Quảng cáo Ngoài trời OOH Toàn quốc | VietBa Group',
      description: 'VietBa Group cung cấp giải pháp quảng cáo ngoài trời OOH tại sân bay, cao tốc, trung tâm thành phố, billboard, màn hình LED và phương tiện giao thông.',
    },
    events: {
      title: 'Tổ chức Sự kiện Chuyên nghiệp Toàn quốc | VietBa Group',
      description: 'VietBa Group tổ chức hội nghị, lễ ra mắt, roadshow, activation và teambuilding chuyên nghiệp, đáp ứng sự kiện doanh nghiệp từ nhỏ đến quy mô lớn.',
    },
  },
  en: {
    communications: {
      title: 'Comprehensive Media Strategy Consulting | VietBa Group',
      description: 'VietBa Group provides comprehensive media strategy, brand positioning, reputation management and crisis communications for growing businesses.',
    },
    technology: {
      title: 'Enterprise Technology & Digital Transformation | VietBa Group',
      description: 'VietBa Group delivers digital transformation, AI, enterprise software, e-commerce, IT infrastructure and cybersecurity solutions for businesses.',
    },
    production: {
      title: 'Professional Multi-platform Content Production | VietBa Group',
      description: 'VietBa Group produces TVCs, game shows, short films, viral clips and digital content backed by extensive television and creative production experience.',
    },
    digital: {
      title: 'Digital Marketing & Performance Marketing | VietBa Group',
      description: 'VietBa Group delivers integrated digital marketing across SEO, SEM, social media, content strategy and multi-platform performance advertising.',
    },
    booking: {
      title: 'Media, Press, Television & KOL Booking | VietBa Group',
      description: 'VietBa Group connects brands with television, radio, press, KOLs, influencers and nationwide advertising channels through integrated media booking.',
    },
    ooh: {
      title: 'Nationwide Outdoor Advertising OOH | VietBa Group',
      description: 'VietBa Group provides strategic OOH advertising at airports, highways and city centers through billboards, LED screens and transit media nationwide.',
    },
    events: {
      title: 'Professional Event Management in Vietnam | VietBa Group',
      description: 'VietBa Group manages conferences, product launches, roadshows, activations and corporate events for audiences ranging from small groups to thousands.',
    },
  },
} as const;

export function getServiceSeo(lang: Language, key: keyof typeof serviceSeo.vi) {
  return serviceSeo[lang][key];
}
