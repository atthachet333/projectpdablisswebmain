import type { NavItem, CompanyStat, TeamMember, TimelineEvent, CompanyValue, ClientLogo } from '../types';

export const COMPANY_INFO = {
  name: 'พีดีเอ บลิส โซลูชันส์',
  nameEn: 'PDA BLISS SOLUTIONS',
  nameFull: 'PDA BLISS COMPANY LIMITED',
  tagline: 'โซลูชันธุรกิจครบวงจร เพื่อการเติบโตอย่างมั่นคง',
  description: 'ผู้ให้บริการด้านเอกสารแรงงานต่างด้าว บริการสมาชิก และที่ปรึกษาสำหรับธุรกิจ บัญชี อุตสาหกรรม และเส้นทางการเงิน เพื่อเสริมศักยภาพให้ธุรกิจของคุณดำเนินงานได้อย่างมีประสิทธิภาพ ปลอดภัย และเติบโตได้อย่างยั่งยืนในทุกมิติทางธุรกิจ',
  phone: '0638693614',
  email: 'pdablissoffice@gmail.com',
  lineOa: '@pdabliss',
  website: 'www.pdabliss.co.th',
  address: 'เลขที่ 88/8 อาคารไทยธุรกิจ ชั้น 5 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10500',
  businessHours: 'จันทร์–ศุกร์ 09:00–18:00 น.',
  founded: 2016,
  social: {
    facebook: 'https://facebook.com/pdabliss',
    line: 'https://line.me/R/ti/p/@pdabliss',
    linkedin: 'https://linkedin.com/company/pdabliss',
    email: 'mailto:pdablissoffice@gmail.com',
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'หน้าหลัก', href: '/', path: '/' },
  { label: 'เกี่ยวกับเรา', href: '/about', path: '/about' },
  { label: 'ธุรกิจของเรา', href: '/services', path: '/services' },
  { label: 'แพ็กเกจสมาชิก', href: '/pricing', path: '/pricing' },
  { label: 'ติดต่อเรา', href: '/contact', path: '/contact' },
];

export const COMPANY_STATS: CompanyStat[] = [
  { label: 'ลูกค้าที่ดูแล', value: '1,000+', suffix: 'ราย', numericValue: 1000, icon: 'Users' },
  { label: 'เอกสารที่ดำเนินการ', value: '10,000+', suffix: 'รายการ', numericValue: 10000, icon: 'FileText' },
  { label: 'ความพึงพอใจ', value: '98%', suffix: '', numericValue: 98, icon: 'Star' },
  { label: 'ทีมงานพร้อมดูแล', value: '24/7', suffix: '', numericValue: 24, icon: 'Clock' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'คุณเตวิด พีระเดช',
    position: 'กรรมการผู้จัดการ',
    description: 'ผู้นำองค์กรที่มีประสบการณ์ด้านเอกสารแรงงานต่างด้าว บริการสมาชิก และที่ปรึกษาธุรกิจมากกว่า 10 ปี มุ่งเน้นการพัฒนาทีมงานและการเติบโตอย่างยั่งยืน',
    image: null,
    initials: 'ตพ',
    linkedin: '#',
  },
  {
    id: 2,
    name: 'คุณวรารักษ์ ศรีสุข',
    position: 'ผู้อำนวยการฝ่ายบริการลูกค้า',
    description: 'ดูแลระบบบริการลูกค้าให้มีประสิทธิภาพสูงสุด มีความเชี่ยวชาญด้านการวางแผนงานบริการและสร้างความพึงพอใจให้แก่ลูกค้าในทุกขั้นตอน',
    image: null,
    initials: 'วส',
    linkedin: '#',
  },
  {
    id: 3,
    name: 'คุณภาณุมิ รัตนชัย',
    position: 'ที่ปรึกษาด้านธุรกิจและการเงิน',
    description: 'ผู้เชี่ยวชาญด้านการวางแผนทางธุรกิจ บัญชี และการเงิน มีความรู้ลึกในอุตสาหกรรมหลากหลายประเภท ช่วยวางแผนการเติบโตอย่างมั่นคง',
    image: null,
    initials: 'ภร',
    linkedin: '#',
  },
  {
    id: 4,
    name: 'คุณชลธิชา แก้วงาม',
    position: 'ผู้จัดการฝ่ายเอกสารและประสานงาน',
    description: 'ดูแลระบบเอกสารแรงงานต่างด้าวอย่างครบวงจร ประสานงานกับหน่วยงานต่าง ๆ ให้งานเสร็จสมบูรณ์ตามกำหนด ด้วยความรอบคอบและประสิทธิภาพ',
    image: null,
    initials: 'ชง',
    linkedin: '#',
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2016',
    title: 'เริ่มก่อตั้ง',
    description: 'ก่อตั้งบริษัทโดยมุ่งมั่นในการให้บริการด้านเอกสารแรงงานต่างด้าวอย่างมืออาชีพ',
    icon: 'Building',
  },
  {
    year: '2018',
    title: 'ขยายบริการ',
    description: 'เพิ่มบริการสมาชิกแบบรายเดือน และที่ปรึกษาด้านธุรกิจ บัญชี และการเงิน',
    icon: 'TrendingUp',
  },
  {
    year: '2020',
    title: 'พัฒนาทีมงาน',
    description: 'เสริมสร้างความเข้มแข็งของทีมงานและระบบ เพื่อรองรับการเติบโตของลูกค้า',
    icon: 'Users',
  },
  {
    year: '2022',
    title: 'สร้างเครือข่ายพันธมิตร',
    description: 'สร้างความร่วมมือกับพันธมิตรทั้งในและต่างประเทศเพื่อเพิ่มศักยภาพการให้บริการ',
    icon: 'Network',
  },
  {
    year: '2024+',
    title: 'เติบโตอย่างยั่งยืน',
    description: 'มุ่งสู่การบริการที่ครบวงจรยิ่งขึ้น พัฒนาเทคโนโลยี และดูแลลูกค้าอย่างมีคุณภาพ',
    icon: 'Rocket',
  },
];

export const COMPANY_VALUES: CompanyValue[] = [
  { id: 1, title: 'ความซื่อสัตย์', description: 'ดำเนินงานอย่างโปร่งใส ตรงไปตรงมา ยึดมั่นในความถูกต้องและความซื่อสัตย์เสมอ', icon: 'Shield' },
  { id: 2, title: 'ความเป็นมืออาชีพ', description: 'ทีมงานมีความเชี่ยวชาญ มุ่งมั่นให้บริการอย่างดีที่สุด และรับผิดชอบต่อทุกงาน', icon: 'Award' },
  { id: 3, title: 'การพัฒนาอย่างต่อเนื่อง', description: 'ไม่หยุดพัฒนาความรู้ อัปเดตกฎหมายและมาตรฐานการให้บริการอย่างสม่ำเสมอ', icon: 'TrendingUp' },
  { id: 4, title: 'การใส่ใจลูกค้า', description: 'เข้าใจความต้องการของลูกค้า และให้คำแนะนำด้วยความใส่ใจและตรงประเด็น', icon: 'Heart' },
  { id: 5, title: 'ความแม่นยำ', description: 'ใส่ใจรายละเอียด ตรวจสอบความถูกต้องของเอกสารและข้อมูลในทุกขั้นตอน', icon: 'Target' },
  { id: 6, title: 'การเติบโตร่วมกัน', description: 'มุ่งสร้างความสำเร็จให้ลูกค้า เพราะความสำเร็จของลูกค้าคือความสำเร็จของเรา', icon: 'Sprout' },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: 1, name: 'Nexon Industries', logo: null },
  { id: 2, name: 'Global Premier', logo: null },
  { id: 3, name: 'Advance Manufacturing', logo: null },
  { id: 4, name: 'Smart Logistics', logo: null },
  { id: 5, name: 'Thai Export Group', logo: null },
  { id: 6, name: 'Oceanic Supply', logo: null },
];

export const CONTACT_SUBJECTS = [
  'สอบถามบริการทั่วไป',
  'บริการจัดการเอกสารแรงงานต่างด้าว',
  'บริการสมาชิก (Subscription)',
  'ที่ปรึกษาธุรกิจและการเงิน',
  'แพ็กเกจและราคา',
  'เรื่องอื่น ๆ',
];

export const CONTACT_SERVICES = [
  'บริการจัดการเอกสารแรงงานต่างด้าว',
  'บริการสมาชิก (Subscription)',
  'ที่ปรึกษาด้านธุรกิจ',
  'ที่ปรึกษาด้านบัญชีและการเงิน',
  'ที่ปรึกษาด้านอุตสาหกรรม',
  'บริการแบบองค์กร',
];

export const WHY_CHOOSE_US = [
  { icon: 'CheckCircle', title: 'ครบจบในที่เดียว', description: 'บริการครบวงจรด้านเอกสารแรงงานต่างด้าว บัญชี และที่ปรึกษาธุรกิจ ช่วยให้คุณไม่ต้องวุ่นวายกับเรื่องเอกสารอีกต่อไป' },
  { icon: 'Clock', title: 'ประหยัดเวลา', description: 'ทีมงานจะดูแลและจัดการให้คุณทั้งหมด ให้คุณมีเวลาไปโฟกัสกับธุรกิจหลักของคุณได้อย่างเต็มที่' },
  { icon: 'Users', title: 'ให้คำปรึกษาโดยผู้เชี่ยวชาญ', description: 'วิเคราะห์ ให้คำแนะนำ และวางแผนการเติบโตร่วมกับทีมผู้เชี่ยวชาญที่มีความรู้ลึกในสาขาของตน' },
  { icon: 'TrendingUp', title: 'รองรับการเติบโตระยะยาว', description: 'วางรากฐานสำหรับธุรกิจที่ยั่งยืน ด้วยแผนงานที่ยืดหยุ่นและพร้อมปรับเปลี่ยนตามทิศทางการเปลี่ยนแปลง' },
];

export const PROCESS_STEPS = [
  { step: 1, title: 'รับฟังความต้องการ', description: 'ทำความเข้าใจธุรกิจ เป้าหมาย และรวบรวมข้อมูลที่เกี่ยวข้องทั้งหมด', icon: 'MessageSquare' },
  { step: 2, title: 'วิเคราะห์และวางแผน', description: 'วิเคราะห์ข้อมูลเชิงลึก กำหนดแนวทางและแผนงานที่เหมาะสมที่สุด', icon: 'Search' },
  { step: 3, title: 'ดำเนินการ', description: 'จัดการงานตามแผนอย่างเป็นระบบและรอบคอบ ตรวจสอบทุกขั้นตอน', icon: 'Settings' },
  { step: 4, title: 'ติดตามผล', description: 'ติดตามความคืบหน้า ตรวจสอบความถูกต้อง และรายงานความก้าวหน้า', icon: 'BarChart' },
  { step: 5, title: 'ส่งมอบและดูแลต่อเนื่อง', description: 'ส่งมอบงานพร้อมดูแลและให้คำปรึกษาต่อเนื่องอย่างสม่ำเสมอ', icon: 'Handshake' },
];

export const HOME_FAQ = [
  { id: 1, question: 'บริการของ PDA BLISS ครอบคลุมอะไรบ้าง?', answer: 'PDA BLISS ให้บริการครบวงจร 3 ด้านหลัก ได้แก่ บริการจัดการเอกสารแรงงานต่างด้าว บริการสมาชิกรายเดือน และบริการที่ปรึกษาด้านธุรกิจ บัญชี อุตสาหกรรม และเส้นทางการเงิน' },
  { id: 2, question: 'เอกสารที่ใช้ในการจัดตั้งบริษัทมีอะไรบ้าง?', answer: 'เอกสารที่จำเป็นขึ้นอยู่กับประเภทของบริษัท โดยทั่วไปต้องการสำเนาบัตรประชาชน สำเนาทะเบียนบ้าน และเอกสารทางธุรกิจ ทีมงานจะแนะนำรายละเอียดที่ครบถ้วนเมื่อปรึกษา' },
  { id: 3, question: 'การสมัครแพ็กเกจสมาชิกมีขั้นตอนอย่างไร?', answer: 'สมัครได้ง่ายๆ ใน 3 ขั้นตอน: 1) ติดต่อทีมงานเพื่อปรึกษา 2) เลือกแพ็กเกจที่เหมาะกับธุรกิจ 3) ทำสัญญาและเริ่มใช้บริการทันที' },
  { id: 4, question: 'หากต้องการยกเลิกบริการต้องทำอย่างไร?', answer: 'สามารถยกเลิกได้โดยแจ้งล่วงหน้า 30 วัน ผ่านทางโทรศัพท์หรืออีเมล ไม่มีค่าปรับในการยกเลิก' },
];
