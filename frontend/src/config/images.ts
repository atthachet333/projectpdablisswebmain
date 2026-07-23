export type ImageConfig = {
  src: string;
  fit?: 'contain' | 'cover';
  position?: string;
  scale?: number;
  aspectRatio?: string;
  labelTh?: string;
  labelEn?: string;
  usage?: string;
  recommendedSize?: string;
  page?: string;
  section?: string;
};

/* ═══════════════════════════════════════════════════════════════════════
 * ⚠️ ข้อจำกัดของไฟล์ภาพปัจจุบัน (ตรวจจากไฟล์จริงแล้ว):
 * hero.png, about-main.png, about-secondary.png, service-*.png,
 * documents.png, membership.png, consulting.png
 * ล้วนเป็น "ภาพ/โปสเตอร์ทึบเต็มผืน" ที่มีพื้นหลัง (และบางไฟล์มีกรอบทอง)
 * ติดมาในตัวไฟล์เอง — CSS ทำให้โปร่งใสไม่ได้
 *
 * ✏️ หากต้องการให้ภาพแสดงแบบไร้กรอบจริง 100%:
 * ควรใช้ไฟล์ PNG/WebP พื้นหลังโปร่งใส แล้วเปลี่ยนค่า src ในไฟล์นี้ที่เดียว
 * ระหว่างนี้ทุกภาพถูกจัดวางแบบ Floating Composition (เอียงเล็กน้อย +
 * drop-shadow ที่ตัววัตถุ + shape ตกแต่งด้านหลัง) เพื่อลดความรู้สึกเป็นกรอบ
 * ═══════════════════════════════════════════════════════════════════════ */
export const siteImages: Record<string, Record<string, ImageConfig>> = {
  home: {
    hero: { 
      src: '/hero.png', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพหลักหน้าแรก', labelEn: 'Home hero image', usage: 'แสดงด้านขวาของ Hero หน้าแรก', recommendedSize: '1600 × 1100 px', page: 'Home', section: 'Hero' 
    },
    aboutMain: { 
      src: '/about-main.png', fit: 'contain', position: 'center', scale: 1, 
      labelTh: 'ภาพหลัก Section About', labelEn: 'About main preview', usage: 'ภาพใหญ่ซ้อนด้านหลัง', recommendedSize: '800 × 1000 px', page: 'Home', section: 'About Preview' 
    },
    aboutSecondary: { 
      src: '/about-secondary.png', fit: 'contain', position: 'center', scale: 1, 
      labelTh: 'ภาพรอง Section About', labelEn: 'About secondary preview', usage: 'ภาพเล็กซ้อนด้านขวาล่าง', recommendedSize: '600 × 600 px', page: 'Home', section: 'About Preview' 
    },
    serviceDocuments: { 
      src: '/service-documents.png', fit: 'contain', position: 'center', scale: 1.04, 
      labelTh: 'โปสเตอร์บริการเอกสาร', labelEn: 'Documents service poster', usage: 'ภาพบริการลำดับที่ 1', recommendedSize: '1200 × 900 px', page: 'Home', section: 'Services' 
    },
    serviceMembership: { 
      src: '/service-membership.png', fit: 'contain', position: 'center', scale: 1.03, 
      labelTh: 'โปสเตอร์บริการสมาชิก', labelEn: 'Membership service poster', usage: 'ภาพบริการลำดับที่ 2', recommendedSize: '1200 × 900 px', page: 'Home', section: 'Services' 
    },
    serviceConsulting: { 
      src: '/service-consulting.png', fit: 'contain', position: 'center bottom', scale: 1.03, 
      labelTh: 'โปสเตอร์บริการที่ปรึกษา', labelEn: 'Consulting service poster', usage: 'ภาพบริการลำดับที่ 3', recommendedSize: '1200 × 900 px', page: 'Home', section: 'Services' 
    },
    testimonialMain: { 
      src: '/images/home/testimonial-main.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพหลัก Testimonial', labelEn: 'Testimonial main image', usage: 'พื้นหลัง Section รีวิวลูกค้า', recommendedSize: '1920 × 1080 px', page: 'Home', section: 'Testimonial' 
    }
  },
  about: {
    /* ═══════════════════════════════════════════════════════════════
     * ✏️ รูปหน้า "เกี่ยวกับเรา" — เปลี่ยนรูปได้ที่นี่ที่เดียว
     * วางไฟล์รูปใหม่ไว้ใน frontend/public แล้วแก้ค่า src ด้านล่าง
     * แนะนำ PNG พื้นหลังโปร่งใส (จะแสดงแบบลอยอิสระ ไม่มีกรอบ)
     * ═══════════════════════════════════════════════════════════════ */
    heroIllustration: {
      src: '/logo.png', fit: 'contain', position: 'center', scale: 1,
      labelTh: 'ภาพประกอบ Hero เกี่ยวกับเรา', labelEn: 'About hero illustration',
      usage: 'ภาพลอยอิสระด้านขวาของ Hero (แทนที่ /logo.png ด้วยรูปจริงภายหลัง)',
      recommendedSize: '900 × 900 px (PNG โปร่งใส)', page: 'About', section: 'Hero',
    },
    expertiseDocuments: {
      src: '/service-documents.png', fit: 'contain', position: 'center', scale: 1,
      labelTh: 'ภาพบริการเอกสารแรงงาน', labelEn: 'Expertise: documents',
      usage: 'ภาพประกอบบริการที่ 1 ใน Section ความเชี่ยวชาญ', recommendedSize: '1200 × 900 px', page: 'About', section: 'Expertise',
    },
    expertiseSoftware: {
      src: '/service-membership.png', fit: 'contain', position: 'center', scale: 1,
      labelTh: 'ภาพบริการซอฟต์แวร์', labelEn: 'Expertise: software',
      usage: 'ภาพประกอบบริการที่ 2 ใน Section ความเชี่ยวชาญ', recommendedSize: '1200 × 900 px', page: 'About', section: 'Expertise',
    },
    expertiseConsulting: {
      src: '/service-consulting.png', fit: 'contain', position: 'center', scale: 1,
      labelTh: 'ภาพบริการที่ปรึกษา', labelEn: 'Expertise: consulting',
      usage: 'ภาพประกอบบริการที่ 3 ใน Section ความเชี่ยวชาญ', recommendedSize: '1200 × 900 px', page: 'About', section: 'Expertise',
    },
    hero: {
      src: '/hero-about.png', fit: 'cover', position: 'center 35%', scale: 1, 
      labelTh: 'ภาพหน้าปก About', labelEn: 'About Hero', usage: 'ด้านขวาของ Hero หน้าเกี่ยวกับเรา', recommendedSize: '1200 × 800 px', page: 'About', section: 'Hero' 
    },
    companyStory: { 
      src: '/images/about/company-story.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพเรื่องราวบริษัท', labelEn: 'Company Story', usage: 'ส่วนเนื้อหาเรื่องราวของบริษัท', recommendedSize: '1200 × 800 px', page: 'About', section: 'Story' 
    },
    vision: { 
      src: '/images/about/vision.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพวิสัยทัศน์', labelEn: 'Vision background', usage: 'พื้นหลังการ์ดวิสัยทัศน์', recommendedSize: '1000 × 1000 px', page: 'About', section: 'Vision' 
    },
    mission: { 
      src: '/images/about/mission.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพพันธกิจ', labelEn: 'Mission background', usage: 'พื้นหลังการ์ดพันธกิจ', recommendedSize: '1000 × 1000 px', page: 'About', section: 'Mission' 
    },
    teamMember1: { 
      src: '/team-01.jpg', fit: 'cover', position: 'center top', scale: 1, 
      labelTh: 'ภาพทีมงาน 1', labelEn: 'Team Member 1', usage: 'ภาพประจำตัวผู้บริหาร 1', recommendedSize: '800 × 1000 px', page: 'About', section: 'Team' 
    },
    teamMember2: { 
      src: '/team-02.jpg', fit: 'cover', position: 'center top', scale: 1, 
      labelTh: 'ภาพทีมงาน 2', labelEn: 'Team Member 2', usage: 'ภาพประจำตัวผู้บริหาร 2', recommendedSize: '800 × 1000 px', page: 'About', section: 'Team' 
    },
    teamMember3: { 
      src: '/team-03.png', fit: 'cover', position: 'center top', scale: 1, 
      labelTh: 'ภาพทีมงาน 3', labelEn: 'Team Member 3', usage: 'ภาพประจำตัวผู้บริหาร 3', recommendedSize: '800 × 1000 px', page: 'About', section: 'Team' 
    },
    teamMember4: { 
      src: '/images/about/team-04.jpg', fit: 'cover', position: 'center top', scale: 1, 
      labelTh: 'ภาพทีมงาน 4', labelEn: 'Team Member 4', usage: 'ภาพประจำตัวผู้บริหาร 4', recommendedSize: '800 × 1000 px', page: 'About', section: 'Team' 
    },
    timeline2016: { 
      src: '/images/about/timeline-2016.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพไทม์ไลน์ 2016', labelEn: 'Timeline 2016', usage: 'ภาพเหตุการณ์ปี 2016', recommendedSize: '1000 × 600 px', page: 'About', section: 'Timeline' 
    },
    timeline2020: { 
      src: '/images/about/timeline-2020.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพไทม์ไลน์ 2020', labelEn: 'Timeline 2020', usage: 'ภาพเหตุการณ์ปี 2020', recommendedSize: '1000 × 600 px', page: 'About', section: 'Timeline' 
    },
    timeline2024: { 
      src: '/images/about/timeline-2024.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพไทม์ไลน์ 2024', labelEn: 'Timeline 2024', usage: 'ภาพเหตุการณ์ปี 2024', recommendedSize: '1000 × 600 px', page: 'About', section: 'Timeline' 
    }
  },
  services: {
    hero: { 
      src: '/images/services/hero.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพหน้าปก บริการ', labelEn: 'Services Hero', usage: 'ด้านขวาของ Hero หน้าบริการ', recommendedSize: '1600 × 1100 px', page: 'Services', section: 'Hero' 
    },
    documents: { 
      src: '/documents.png', fit: 'contain', position: 'center', scale: 1.04, 
      labelTh: 'โปสเตอร์บริการเอกสาร', labelEn: 'Documents service poster', usage: 'บริการเอกสารต่างด้าว', recommendedSize: '1200 × 900 px', page: 'Services', section: 'Service List' 
    },
    membership: { 
      src: '/membership.png', fit: 'contain', position: 'center', scale: 1.03, 
      labelTh: 'โปสเตอร์บริการสมาชิก', labelEn: 'Membership service poster', usage: 'บริการดูแลรายปี', recommendedSize: '1200 × 900 px', page: 'Services', section: 'Service List' 
    },
    consulting: { 
      src: '/consulting.png', fit: 'contain', position: 'center bottom', scale: 1.03, 
      labelTh: 'โปสเตอร์บริการที่ปรึกษา', labelEn: 'Consulting service poster', usage: 'บริการให้คำปรึกษา', recommendedSize: '1200 × 900 px', page: 'Services', section: 'Service List' 
    },
    process: { 
      src: '/images/services/process.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพขั้นตอนบริการ', labelEn: 'Process Image', usage: 'พื้นหลัง Section ขั้นตอนทำงาน', recommendedSize: '1920 × 1080 px', page: 'Services', section: 'Process' 
    }
  },
  pricing: {
    hero: { 
      src: '/images/pricing/hero.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพหน้าปก แพ็กเกจ', labelEn: 'Pricing Hero', usage: 'ด้านขวาของ Hero หน้าแพ็กเกจ', recommendedSize: '1600 × 1100 px', page: 'Pricing', section: 'Hero' 
    },
    starter: { 
      src: '/images/pricing/starter.jpg', fit: 'contain', position: 'center', scale: 1.05, 
      labelTh: 'ภาพ Starter', labelEn: 'Starter Image', usage: 'แบนเนอร์ด้านบนแพ็กเกจ Starter', recommendedSize: '800 × 400 px', page: 'Pricing', section: 'Cards' 
    },
    professional: { 
      src: '/images/pricing/professional.jpg', fit: 'contain', position: 'center', scale: 1.05, 
      labelTh: 'ภาพ Professional', labelEn: 'Professional Image', usage: 'แบนเนอร์ด้านบนแพ็กเกจ Professional', recommendedSize: '800 × 400 px', page: 'Pricing', section: 'Cards' 
    },
    enterprise: { 
      src: '/images/pricing/enterprise.jpg', fit: 'contain', position: 'center', scale: 1.05, 
      labelTh: 'ภาพ Enterprise', labelEn: 'Enterprise Image', usage: 'แบนเนอร์ด้านบนแพ็กเกจ Enterprise', recommendedSize: '800 × 400 px', page: 'Pricing', section: 'Cards' 
    },
    consultation: { 
      src: '/images/pricing/consultation.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพ Consultation', labelEn: 'Consultation Image', usage: 'ด้านซ้ายของแถบติดต่อด้านล่าง', recommendedSize: '1200 × 1200 px', page: 'Pricing', section: 'CTA' 
    }
  },
  contact: {
    hero: { 
      src: '/images/contact/hero.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพหน้าปก ติดต่อ', labelEn: 'Contact Hero', usage: 'ด้านขวาของ Hero หน้าติดต่อเรา', recommendedSize: '1600 × 1100 px', page: 'Contact', section: 'Hero' 
    },
    office: { 
      src: '/images/contact/office.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพสำนักงาน', labelEn: 'Office Image', usage: 'ด้านซ้ายของช่องทางติดต่อ', recommendedSize: '1200 × 1200 px', page: 'Contact', section: 'Info' 
    },
    map: { 
      src: '/location-map.png', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'แผนที่ตั้ง', labelEn: 'Location Map', usage: 'ส่วนล่างสำหรับแสดงพิกัดที่ตั้งบริษัท', recommendedSize: '1920 × 800 px', page: 'Contact', section: 'Map' 
    },
    team: { 
      src: '/images/contact/team.jpg', fit: 'cover', position: 'center', scale: 1, 
      labelTh: 'ภาพทีมงาน', labelEn: 'Support Team', usage: 'ส่วนเสริมด้านการสนับสนุน', recommendedSize: '1200 × 800 px', page: 'Contact', section: 'Support' 
    }
  }
};
