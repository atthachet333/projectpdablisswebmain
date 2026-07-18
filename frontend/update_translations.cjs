const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'locales', 'en', 'common.json');
const thPath = path.join(__dirname, 'src', 'locales', 'th', 'common.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const thData = JSON.parse(fs.readFileSync(thPath, 'utf8'));

// Deep merge function
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Data to inject
const newEn = {
  hero: {
    title: "Document & Business Management",
    title2: "With Professionals",
    desc: "PDA BLISS provides migrant worker documentation, business membership services, and management consulting by an experienced team. We help reduce complex workflows, increase accuracy, and track every step systematically, allowing business owners to fully focus on growth.",
    trustText1: "Managed by specialized experts",
    trustText2: "Systematic status tracking",
    trustText3: "Secure data handling"
  },
  servicesIntro: {
    title: "Our Solutions",
    subtitle: "Comprehensive services designed from real business challenges.",
    desc: "We developed our services from real problems business owners face—complex paperwork, time-consuming tracking, and lack of holistic consulting. Our solutions are designed to connect systematically, from document management to continuous care, and all the way to business and financial planning."
  },
  services: {
    items: {
      foreignLabor: {
        title: "Migrant Worker Documentation",
        desc: "We manage the entire migrant worker documentation process—from initial verification, document preparation, submission, and renewal, to tracking status with relevant agencies. Our team ensures completeness, minimizes risks from incorrect data, and alerts you to important deadlines so your business runs continuously and complies with regulations.",
        results: [
          "Reduce document preparation time",
          "Minimize risks of incomplete documents",
          "Systematic workflow tracking",
          "Dedicated coordination team",
          "Advance renewal notifications"
        ]
      },
      membership: {
        title: "Business Membership Services",
        desc: "Our membership service is designed for businesses that need continuous assistance and tracking. Members receive important updates, preliminary advice, document tracking, and a fast communication channel. This reduces the burden on business owners and ensures all critical matters are consistently managed.",
        results: [
          "Continuous tracking team",
          "Alerts for critical matters",
          "Convenient consultation access",
          "Reduce missed deadlines",
          "Easier forward planning"
        ]
      },
      consulting: {
        title: "Business, Accounting, Industrial & Financial Consulting",
        desc: "Our consulting team analyzes business structures, costs, workflows, and growth strategies based on real data from each organization. We don't just give general advice; we help prioritize, plan operations, and track results so executives can make confident decisions and clearly see the big picture.",
        results: [
          "Cost and process analysis",
          "Growth planning",
          "Workflow improvement",
          "Prioritization support",
          "Executive decision support"
        ]
      }
    }
  },
  about: {
    previewText: "We believe good service isn't just about finishing tasks, but helping clients understand the situation, plan ahead, and feel confident in every step. The PDA BLISS team prioritizes transparency, accuracy, and clear communication to build long-term relationships and grow together.",
    bullets: [
      "Understand real business problems",
      "Work with data and processes",
      "Straightforward communication",
      "Continuous follow-up"
    ],
    story: {
      title: "Our Story",
      p1: "PDA BLISS began with the intention of reducing the complexity of paperwork and administrative tasks that business owners face daily. We found that many organizations have capable teams but spend too much time on redundant processes, multi-party coordination, and unstructured data.",
      p2: "Through our experience working with various business types, we developed services that combine document management, membership care, and business consulting. This ensures clients receive continuous support, not just immediate problem-solving.",
      p3: "Today, our goal remains the same: to help business owners work easier, make confident decisions, and have time to focus on organizational growth."
    },
    vision: "To be a trusted business partner through transparent, standardized services that help businesses achieve stable, long-term growth.",
    mission: [
      "Develop clear, verifiable service processes",
      "Handle client data and documents with utmost responsibility",
      "Build an expert team ready for continuous learning",
      "Utilize data and technology to increase efficiency",
      "Forge long-term relationships with clients and partners"
    ],
    values: {
      items: {
        integrity: {
          title: "Integrity",
          desc: "We work with transparency, straightforwardness, and honesty in every step. There are no hidden costs, and we always communicate the truth about situations."
        },
        professionalism: {
          title: "Professionalism",
          desc: "Our team operates with high standards, adhering to rules and regulations, and consistently delivering quality results on time."
        },
        accuracy: {
          title: "Accuracy",
          desc: "We meticulously check every detail to ensure that all documents and advice provided to our clients are completely accurate and flawless."
        },
        clientCare: {
          title: "Client Care",
          desc: "We listen and understand the unique needs of each client, treating their business as if it were our own."
        },
        continuousImprovement: {
          title: "Continuous Improvement",
          desc: "We never stop learning and adapting to new regulations and technologies to provide better and faster services."
        },
        mutualGrowth: {
          title: "Mutual Growth",
          desc: "We believe that our success is directly tied to our clients' success. We are committed to growing alongside our partners."
        }
      }
    },
    team: {
      title: "Our Team",
      subtitle: "The professionals committed to supporting your business to the fullest.",
      members: [
        {
          name: "Ekkapon Sitthichok",
          role: "Managing Director",
          expertise: "Business Strategy & General Management",
          experience: "15+ years in corporate management",
          desc: "Oversees overall planning, coordinates teams, and ensures service quality so every project meets our company's high standards.",
          quote: "\"Transparency and process are the keys to sustainable business.\""
        },
        {
          name: "Natcha Wongwiwat",
          role: "Head of Operations",
          expertise: "Document Processing & Compliance",
          experience: "10+ years in industrial compliance",
          desc: "Manages the execution of document processes, ensuring accuracy and timely delivery across all client accounts.",
          quote: "\"Accuracy in details prevents major issues down the line.\""
        },
        {
          name: "Siriporn Thongdee",
          role: "Client Success Manager",
          expertise: "Client Relations & Membership Services",
          experience: "8+ years in B2B client success",
          desc: "Serves as the primary contact for our members, ensuring their continuous needs are met and expectations exceeded.",
          quote: "\"Listening is the first step to true problem solving.\""
        }
      ]
    },
    timeline: {
      title: "Our Journey",
      items: [
        {
          year: "2016",
          title: "The Beginning",
          desc: "Started providing documentation and coordination services for small businesses."
        },
        {
          year: "2018",
          title: "Membership Introduction",
          desc: "Expanded into membership services, beginning continuous monthly client care."
        },
        {
          year: "2020",
          title: "Standardization",
          desc: "Developed specialized teams and standardized our workflow tracking systems."
        },
        {
          year: "2022",
          title: "Consulting Expansion",
          desc: "Built a network of partners across industries and introduced comprehensive business consulting."
        },
        {
          year: "2024",
          title: "Enterprise Solutions",
          desc: "Upgraded our service systems to support multi-branch businesses and complex operations."
        },
        {
          year: "2025+",
          title: "Future Forward",
          desc: "Focusing on technology and data systems to make client tracking even more convenient."
        }
      ]
    }
  },
  whyUs: {
    items: {
      comprehensive: {
        title: "All-in-One Service",
        desc: "Clients don't need to coordinate with multiple parties. We handle everything from data verification and document preparation to follow-ups, connecting all processes and reducing redundancy."
      },
      fast: {
        title: "Fast Response",
        desc: "Our team prioritizes urgency and continuously updates clients on status. This reduces anxiety and allows for timely operational planning."
      },
      expert: {
        title: "Specialized Experts",
        desc: "Each task is handled by someone with specific expertise, ready to review details and offer advice tailored to your business context."
      },
      transparent: {
        title: "Transparent & Verifiable",
        desc: "We clearly communicate steps, timelines, and crucial information. Clients can track status and ask for details throughout the entire process."
      },
      scalable: {
        title: "Supports Growth",
        desc: "Our services scale with your business's size and complexity, from small enterprises to multi-department organizations."
      }
    }
  },
  process: {
    items: [
      {
        title: "Listen & Assess",
        desc: "Our team discusses your problems, goals, timelines, and constraints before proposing the right approach."
      },
      {
        title: "Verify Data",
        desc: "We gather and review related documents to find areas that need correction and minimize errors before starting."
      },
      {
        title: "Plan & Execute",
        desc: "We prioritize steps, assign responsibilities, and execute according to the agreed plan."
      },
      {
        title: "Track & Report",
        desc: "We consistently report status, progress, and issues requiring decisions."
      },
      {
        title: "Deliver & Support",
        desc: "We verify completeness before handover and offer advice for next steps to prevent future issues."
      }
    ]
  },
  metrics: {
    desc1: "Clients and businesses we have consulted and cared for",
    desc2: "Documents and tasks processed and verified",
    desc3: "Satisfaction rate from our service users",
    desc4: "Support system and contact channels for urgent tasks"
  },
  clients: {
    title: "TRUSTED BY INNOVATIVE COMPANIES",
    desc: "We support businesses ranging from growing SMEs to multi-branch organizations, adapting our services to each company's operations, priorities, and long-term goals.",
    tooltip: "Trusted by PDA BLISS",
    industry: {
      manufacturing: "Manufacturing",
      logistics: "Logistics",
      trading: "Trading",
      foodService: "Food Service",
      construction: "Construction",
      technology: "Technology",
      consulting: "Consulting",
      export: "Export",
      retail: "Retail",
      industrialServices: "Industrial Services"
    }
  },
  pricing: {
    whichPackage: "Which package is right for you?",
    starterDesc: "Ideal for small businesses needing a basic inquiry and tracking channel, without complex or multi-departmental tasks.",
    proDesc: "Ideal for businesses with continuous paperwork that need a tracking team and advice on operational planning.",
    enterpriseDesc: "Ideal for organizations, factories, or multi-branch businesses requiring a dedicated manager, reporting, and multi-party coordination.",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "How do I upgrade or downgrade my plan?",
        a: "You can upgrade or downgrade your plan at any time by notifying us 7 days in advance. Changes take effect in the following billing cycle."
      },
      {
        q: "What documents are required to start?",
        a: "Required documents depend on your company type. Generally, ID copies and company registration documents are needed. Our team will guide you through the specifics during onboarding."
      },
      {
        q: "Is there a long-term contract?",
        a: "No, you can subscribe on a monthly basis without long-term commitments. You can cancel with a 30-day notice."
      },
      {
        q: "How fast is the response time?",
        a: "For Starter, within 1 business day. For Professional, within 4 hours. Enterprise clients receive priority response within 2 hours during business hours."
      },
      {
        q: "Can I cancel the service at any time?",
        a: "Yes, you can cancel by giving a 30-day notice via phone or email. There are no hidden cancellation fees."
      },
      {
        q: "What does the monthly report include?",
        a: "The monthly report includes a summary of completed tasks, upcoming deadlines, pending documents, and actionable advice tailored to your business."
      },
      {
        q: "Do you offer refunds?",
        a: "We do not offer refunds for the current month of service. However, you can cancel at any time to prevent future billing."
      },
      {
        q: "Are government fees included in the package?",
        a: "No, the packages cover our service and consulting fees. Any government fees, taxes, or official duties are billed separately at actual cost."
      },
      {
        q: "How many consultations do I get?",
        a: "Starter includes 1 session/month. Professional includes 2 sessions/month. Enterprise includes unlimited priority consultations during business hours."
      },
      {
        q: "Who will be handling my account?",
        a: "You will be assigned a dedicated account manager based on your tier. Professional and Enterprise tiers get senior specialists tailored to their industry."
      }
    ]
  },
  contact: {
    intro: "Whether you're starting a business, needing to solve documentation issues, or looking for a team to continuously manage and track your work, you can send us your preliminary details. Our team will review your information and contact you back to suggest the best approach, with no cost for the initial consultation.",
    channels: {
      phone: "Ideal for urgent matters or quick preliminary inquiries.",
      email: "Ideal for sending details, documents, or questions requiring a written response.",
      line: "A convenient channel for tracking work and chatting with our service team.",
      appointment: "Choose a convenient date and time to speak with a consultant about your business."
    },
    trustText: [
      "Your information will not be shared with third parties",
      "Our team will contact you within 1 business day",
      "Initial consultation is completely free",
      "All documents are handled with strict confidentiality"
    ]
  },
  footer: {
    companyDesc: "Providing migrant worker documentation, business membership services, and consulting for management, accounting, industrial, and financial pathways. We aim to reduce complexity, increase accuracy, and continuously support client growth.",
    officeHours: "Mon-Fri 09:00 - 18:00 (Closed on weekends and public holidays)",
    responseTime: "Response within 1 business day",
    registration: "Company Registration: XXXXXXXXXXXXX",
    ctaTitle: "Ready to elevate your business management?",
    ctaDesc: "Talk to our team to assess your needs, plan your steps, and find the right service format for your business.",
    ctaBtn1: "Get a Consultation",
    ctaBtn2: "View All Services",
    privacy: "Privacy Policy",
    terms: "Terms of Service"
  }
};

const newTh = {
  hero: {
    title: "จัดการเอกสารและธุรกิจ",
    title2: "ด้วยทีมงานมืออาชีพ",
    desc: "PDA BLISS ให้บริการด้านการจัดการเอกสารแรงงานต่างด้าว บริการสมาชิกสำหรับธุรกิจ และคำปรึกษาด้านการบริหารจัดการ โดยทีมงานที่เข้าใจกระบวนการทำงานจริง เราช่วยลดภาระงานที่ซับซ้อน เพิ่มความถูกต้อง และติดตามทุกขั้นตอนอย่างเป็นระบบ เพื่อให้เจ้าของธุรกิจสามารถทุ่มเทเวลาให้กับการเติบโตได้อย่างเต็มที่",
    trustText1: "ดูแลโดยผู้เชี่ยวชาญเฉพาะด้าน",
    trustText2: "ติดตามสถานะได้ทุกขั้นตอน",
    trustText3: "ข้อมูลลูกค้าได้รับการดูแลอย่างปลอดภัย"
  },
  servicesIntro: {
    title: "บริการของเรา",
    subtitle: "บริการที่ครอบคลุม ออกแบบจากปัญหาจริงของธุรกิจ",
    desc: "เราพัฒนาบริการจากปัญหาที่เจ้าของธุรกิจพบจริง ทั้งเรื่องเอกสารที่ซับซ้อน การติดตามงานที่ใช้เวลานาน และการขาดผู้ให้คำปรึกษาที่เข้าใจภาพรวม บริการของเราจึงถูกออกแบบให้เชื่อมโยงกันอย่างเป็นระบบ ตั้งแต่การจัดการเอกสาร การดูแลต่อเนื่อง ไปจนถึงการวางแผนธุรกิจและการเงิน"
  },
  services: {
    items: {
      foreignLabor: {
        title: "บริการจัดการเอกสารแรงงานต่างด้าว",
        desc: "เราดูแลกระบวนการเอกสารแรงงานต่างด้าวตั้งแต่การตรวจสอบข้อมูลเบื้องต้น การเตรียมเอกสาร การยื่นคำขอ การต่ออายุ ไปจนถึงการติดตามสถานะกับหน่วยงานที่เกี่ยวข้อง ทีมงานจะช่วยตรวจสอบความครบถ้วนของเอกสาร ลดความเสี่ยงจากข้อมูลผิดพลาด และแจ้งเตือนกำหนดเวลาสำคัญ เพื่อให้ธุรกิจดำเนินงานได้อย่างต่อเนื่องและสอดคล้องกับข้อกำหนด",
        results: [
          "ลดเวลาการจัดเตรียมเอกสาร",
          "ลดความเสี่ยงจากเอกสารไม่ครบ",
          "ติดตามงานได้อย่างเป็นระบบ",
          "มีทีมงานคอยประสานงาน",
          "ได้รับคำแนะนำก่อนถึงกำหนดต่ออายุ"
        ]
      },
      membership: {
        title: "บริการสมาชิกสำหรับธุรกิจ",
        desc: "บริการสมาชิกได้รับการออกแบบสำหรับธุรกิจที่ต้องการผู้ช่วยดูแลและติดตามงานอย่างต่อเนื่อง สมาชิกจะได้รับการอัปเดตข้อมูลสำคัญ คำแนะนำเบื้องต้น การติดตามเอกสาร และช่องทางติดต่อทีมงานที่สะดวกรวดเร็ว ช่วยลดภาระของเจ้าของธุรกิจและทำให้ทุกเรื่องสำคัญได้รับการดูแลอย่างสม่ำเสมอ",
        results: [
          "มีทีมงานคอยติดตามงาน",
          "รับการแจ้งเตือนเรื่องสำคัญ",
          "ขอคำปรึกษาได้สะดวก",
          "ลดการพลาดกำหนดเวลา",
          "วางแผนงานล่วงหน้าได้ง่ายขึ้น"
        ]
      },
      consulting: {
        title: "ที่ปรึกษาด้านธุรกิจ บัญชี อุตสาหกรรม และการเงิน",
        desc: "ทีมที่ปรึกษาของเราช่วยวิเคราะห์โครงสร้างธุรกิจ ต้นทุน กระบวนการทำงาน และแนวทางการเติบโต โดยพิจารณาจากข้อมูลจริงของแต่ละองค์กร เราไม่ได้ให้เพียงคำแนะนำทั่วไป แต่ช่วยจัดลำดับความสำคัญ วางแผนการดำเนินงาน และติดตามผล เพื่อให้ผู้บริหารตัดสินใจได้อย่างมั่นใจและเห็นภาพรวมของธุรกิจได้ชัดเจนยิ่งขึ้น",
        results: [
          "วิเคราะห์ต้นทุนและกระบวนการ",
          "วางแผนการเติบโต",
          "ปรับปรุงระบบงาน",
          "ช่วยจัดลำดับความสำคัญ",
          "สนับสนุนการตัดสินใจของผู้บริหาร"
        ]
      }
    }
  },
  about: {
    previewText: "เราเชื่อว่าบริการที่ดีไม่ใช่เพียงการทำงานให้เสร็จ แต่ต้องช่วยให้ลูกค้าเข้าใจสถานการณ์ วางแผนล่วงหน้า และมั่นใจในทุกขั้นตอน ทีมงานของ PDA BLISS จึงให้ความสำคัญกับความโปร่งใส ความถูกต้อง และการสื่อสารที่ชัดเจน เพื่อสร้างความสัมพันธ์ระยะยาวกับลูกค้าและเติบโตไปด้วยกัน",
    bullets: [
      "เข้าใจปัญหาของธุรกิจจริง",
      "ทำงานด้วยข้อมูลและกระบวนการ",
      "สื่อสารตรงไปตรงมา",
      "ติดตามผลอย่างต่อเนื่อง"
    ],
    story: {
      title: "เรื่องราวของเรา",
      p1: "PDA BLISS เริ่มต้นจากความตั้งใจที่จะช่วยลดความซับซ้อนของงานเอกสารและงานบริหารที่เจ้าของธุรกิจต้องเผชิญในแต่ละวัน เราพบว่าหลายองค์กรมีทีมงานที่มีศักยภาพ แต่ต้องใช้เวลาไปกับกระบวนการที่ซ้ำซ้อน การประสานงานหลายฝ่าย และข้อมูลที่ไม่เป็นระบบ",
      p2: "จากประสบการณ์ในการทำงานร่วมกับธุรกิจหลายประเภท เราจึงพัฒนาบริการที่ผสานการจัดการเอกสาร การดูแลแบบสมาชิก และคำปรึกษาธุรกิจเข้าไว้ด้วยกัน เพื่อให้ลูกค้าได้รับการสนับสนุนอย่างต่อเนื่อง ไม่ใช่เพียงการแก้ปัญหาเฉพาะหน้า",
      p3: "วันนี้เป้าหมายของเรายังคงเหมือนเดิม คือช่วยให้เจ้าของธุรกิจทำงานได้ง่ายขึ้น ตัดสินใจได้มั่นใจขึ้น และมีเวลามุ่งเน้นกับการเติบโตขององค์กร"
    },
    vision: "เป็นพันธมิตรทางธุรกิจที่ลูกค้าไว้วางใจ ด้วยบริการที่โปร่งใส มีมาตรฐาน และช่วยให้ธุรกิจสามารถเติบโตอย่างมั่นคงในระยะยาว",
    mission: [
      "พัฒนากระบวนการบริการให้เข้าใจง่ายและตรวจสอบได้",
      "ดูแลข้อมูลและเอกสารของลูกค้าด้วยความรับผิดชอบ",
      "สร้างทีมงานที่มีความเชี่ยวชาญและพร้อมเรียนรู้",
      "ใช้ข้อมูลและเทคโนโลยีเพื่อเพิ่มประสิทธิภาพ",
      "สร้างความสัมพันธ์ระยะยาวกับลูกค้าและพันธมิตร"
    ],
    values: {
      items: {
        integrity: {
          title: "ความซื่อสัตย์",
          desc: "เราทำงานด้วยความโปร่งใส ตรงไปตรงมา และซื่อสัตย์ในทุกขั้นตอน ไม่มีค่าใช้จ่ายแอบแฝง และสื่อสารความจริงเกี่ยวกับสถานการณ์เสมอ"
        },
        professionalism: {
          title: "ความเป็นมืออาชีพ",
          desc: "ทีมงานของเราปฏิบัติงานด้วยมาตรฐานระดับสูง ยึดมั่นในกฎระเบียบ และส่งมอบผลงานที่มีคุณภาพตรงตามเวลาอย่างสม่ำเสมอ"
        },
        accuracy: {
          title: "ความแม่นยำ",
          desc: "เราตรวจสอบทุกรายละเอียดอย่างรอบคอบ เพื่อให้มั่นใจว่าเอกสารและคำแนะนำที่มอบให้ลูกค้านั้นถูกต้องและไร้ข้อผิดพลาด"
        },
        clientCare: {
          title: "การใส่ใจลูกค้า",
          desc: "เรารับฟังและทำความเข้าใจความต้องการเฉพาะของลูกค้าแต่ละราย พร้อมดูแลธุรกิจของลูกค้าเสมือนเป็นธุรกิจของเราเอง"
        },
        continuousImprovement: {
          title: "การพัฒนาอย่างต่อเนื่อง",
          desc: "เราไม่หยุดเรียนรู้และปรับตัวเข้ากับกฎระเบียบและเทคโนโลยีใหม่ๆ เพื่อให้บริการที่ดีและรวดเร็วยิ่งขึ้นเสมอ"
        },
        mutualGrowth: {
          title: "การเติบโตร่วมกัน",
          desc: "เราเชื่อว่าความสำเร็จของเราเชื่อมโยงกับความสำเร็จของลูกค้าโดยตรง เรามุ่งมั่นที่จะเติบโตเคียงข้างพันธมิตรของเรา"
        }
      }
    },
    team: {
      title: "ทีมงานของเรา",
      subtitle: "ผู้เชี่ยวชาญที่พร้อมสนับสนุนธุรกิจของคุณอย่างเต็มที่",
      members: [
        {
          name: "เอกพล สิทธิโชค",
          role: "กรรมการผู้จัดการ",
          expertise: "การวางแผนกลยุทธ์และการบริหารภาพรวม",
          experience: "ประสบการณ์กว่า 15 ปีในการบริหารองค์กร",
          desc: "ดูแลการวางแผนภาพรวม ประสานงานทีม และตรวจสอบคุณภาพการให้บริการ เพื่อให้ทุกโครงการดำเนินไปตามเป้าหมายและมาตรฐานของบริษัท",
          quote: "\"ความโปร่งใสและระบบคือหัวใจของธุรกิจที่ยั่งยืน\""
        },
        {
          name: "ณัชชา วงศ์วิวัฒน์",
          role: "หัวหน้าฝ่ายปฏิบัติการ",
          expertise: "การจัดการเอกสารและกฎระเบียบ",
          experience: "ประสบการณ์กว่า 10 ปีในอุตสาหกรรม",
          desc: "บริหารจัดการขั้นตอนงานเอกสารทั้งหมด ตรวจสอบความถูกต้อง และส่งมอบงานตรงตามกำหนดเวลาให้กับลูกค้าทุกราย",
          quote: "\"ความแม่นยำในรายละเอียดช่วยป้องกันปัญหาใหญ่ในอนาคต\""
        },
        {
          name: "ศิริพร ทองดี",
          role: "ผู้จัดการดูแลลูกค้า",
          expertise: "การบริการสมาชิกและลูกค้าสัมพันธ์",
          experience: "ประสบการณ์กว่า 8 ปีในการดูแลลูกค้า B2B",
          desc: "เป็นผู้ประสานงานหลักสำหรับสมาชิก คอยรับฟังความต้องการและดูแลให้ลูกค้าได้รับบริการที่เกินความคาดหมาย",
          quote: "\"การรับฟังคือจุดเริ่มต้นของการแก้ปัญหาที่แท้จริง\""
        }
      ]
    },
    timeline: {
      title: "เส้นทางของเรา",
      items: [
        {
          year: "2016",
          title: "จุดเริ่มต้น",
          desc: "เริ่มต้นให้บริการด้านเอกสารและการประสานงานสำหรับธุรกิจขนาดเล็ก"
        },
        {
          year: "2018",
          title: "บริการสมาชิก",
          desc: "ขยายบริการสมาชิกและเริ่มดูแลลูกค้าแบบต่อเนื่องรายเดือน"
        },
        {
          year: "2020",
          title: "สร้างมาตรฐาน",
          desc: "พัฒนาทีมงานเฉพาะด้านและปรับระบบติดตามงานให้เป็นมาตรฐาน"
        },
        {
          year: "2022",
          title: "ขยายเครือข่าย",
          desc: "สร้างเครือข่ายพันธมิตรในหลายอุตสาหกรรมและเพิ่มบริการคำปรึกษา"
        },
        {
          year: "2024",
          title: "ยกระดับบริการ",
          desc: "พัฒนาระบบบริการให้รองรับธุรกิจที่มีหลายสาขาและกระบวนการซับซ้อน"
        },
        {
          year: "2025+",
          title: "อนาคต",
          desc: "มุ่งพัฒนาเทคโนโลยีและระบบข้อมูลเพื่อให้ลูกค้าติดตามงานได้สะดวกขึ้น"
        }
      ]
    }
  },
  whyUs: {
    items: {
      comprehensive: {
        title: "ครบจบในที่เดียว",
        desc: "ลูกค้าไม่จำเป็นต้องประสานงานหลายฝ่าย เราช่วยดูแลตั้งแต่การตรวจสอบข้อมูล การเตรียมเอกสาร ไปจนถึงการติดตามผล ทำให้ขั้นตอนต่าง ๆ เชื่อมโยงกันและลดความซ้ำซ้อนในการทำงาน"
      },
      fast: {
        title: "ตอบสนองรวดเร็ว",
        desc: "ทีมงานจัดลำดับความเร่งด่วนของแต่ละเรื่องและแจ้งสถานะให้ลูกค้าทราบอย่างต่อเนื่อง ช่วยลดความกังวลและทำให้สามารถวางแผนงานได้ทันเวลา"
      },
      expert: {
        title: "ผู้เชี่ยวชาญเฉพาะทาง",
        desc: "งานแต่ละประเภทได้รับการดูแลโดยผู้ที่มีความเข้าใจเฉพาะด้าน พร้อมตรวจสอบรายละเอียดและให้คำแนะนำที่เหมาะกับบริบทของธุรกิจ"
      },
      transparent: {
        title: "โปร่งใสและตรวจสอบได้",
        desc: "เราสื่อสารขั้นตอน ระยะเวลา และข้อมูลสำคัญอย่างชัดเจน ลูกค้าสามารถติดตามสถานะและสอบถามรายละเอียดได้ตลอดกระบวนการ"
      },
      scalable: {
        title: "รองรับการเติบโต",
        desc: "บริการของเราสามารถปรับตามขนาดและความซับซ้อนของธุรกิจ ตั้งแต่ธุรกิจขนาดเล็กไปจนถึงองค์กรที่มีหลายแผนก"
      }
    }
  },
  process: {
    items: [
      {
        title: "รับฟังและประเมิน",
        desc: "ทีมงานพูดคุยเพื่อทำความเข้าใจปัญหา เป้าหมาย ระยะเวลา และข้อจำกัดของลูกค้า ก่อนเสนอแนวทางที่เหมาะสม"
      },
      {
        title: "ตรวจสอบข้อมูล",
        desc: "รวบรวมและตรวจสอบเอกสารหรือข้อมูลที่เกี่ยวข้อง เพื่อค้นหาประเด็นที่ต้องแก้ไขและลดความผิดพลาดก่อนเริ่มดำเนินการ"
      },
      {
        title: "วางแผนและดำเนินงาน",
        desc: "จัดลำดับขั้นตอน กำหนดผู้รับผิดชอบ และดำเนินงานตามแผนที่ตกลงร่วมกัน"
      },
      {
        title: "ติดตามและรายงาน",
        desc: "แจ้งสถานะ ความคืบหน้า และประเด็นที่ต้องตัดสินใจให้ลูกค้าทราบอย่างสม่ำเสมอ"
      },
      {
        title: "ส่งมอบและดูแลต่อเนื่อง",
        desc: "ตรวจสอบความครบถ้วนก่อนส่งมอบ พร้อมให้คำแนะนำสำหรับขั้นตอนถัดไปและการป้องกันปัญหาในอนาคต"
      }
    ]
  },
  metrics: {
    desc1: "ลูกค้าและธุรกิจที่เราเคยให้คำปรึกษาและดูแล",
    desc2: "รายการเอกสารและงานที่ผ่านกระบวนการตรวจสอบ",
    desc3: "ระดับความพึงพอใจจากลูกค้าที่ใช้บริการ",
    desc4: "ระบบรับเรื่องและช่องทางติดต่อสำหรับงานสำคัญ"
  },
  clients: {
    title: "ได้รับความไว้วางใจจากธุรกิจหลากหลายอุตสาหกรรม",
    desc: "เรามีโอกาสสนับสนุนธุรกิจตั้งแต่ผู้ประกอบการรายย่อย บริษัทที่กำลังเติบโต ไปจนถึงองค์กรที่มีหลายสาขา โดยปรับรูปแบบการดูแลให้เหมาะกับกระบวนการและเป้าหมายของแต่ละธุรกิจ",
    tooltip: "ลูกค้าที่ไว้วางใจ PDA BLISS",
    industry: {
      manufacturing: "การผลิต",
      logistics: "โลจิสติกส์",
      trading: "การค้า",
      foodService: "อาหารและเครื่องดื่ม",
      construction: "ก่อสร้าง",
      technology: "เทคโนโลยี",
      consulting: "บริการ",
      export: "นำเข้า-ส่งออก",
      retail: "ค้าปลีก",
      industrialServices: "บริการอุตสาหกรรม"
    }
  },
  pricing: {
    whichPackage: "แพ็กเกจไหนเหมาะกับคุณ?",
    starterDesc: "เหมาะสำหรับธุรกิจขนาดเล็กที่ต้องการช่องทางสอบถามและติดตามงานพื้นฐาน โดยยังไม่มีงานที่ซับซ้อนหรือหลายแผนก",
    proDesc: "เหมาะสำหรับธุรกิจที่มีงานเอกสารต่อเนื่อง ต้องการทีมช่วยติดตาม และต้องการคำแนะนำในการวางแผนงาน",
    enterpriseDesc: "เหมาะสำหรับองค์กร โรงงาน หรือธุรกิจที่มีหลายสาขา ต้องการผู้ดูแลประจำ รายงาน และการประสานงานหลายฝ่าย",
    faqTitle: "คำถามที่พบบ่อย (FAQ)",
    faqs: [
      {
        q: "สามารถเปลี่ยนแพ็กเกจภายหลังได้หรือไม่?",
        a: "ได้ครับ คุณสามารถแจ้งขออัปเกรดหรือลดแพ็กเกจล่วงหน้า 7 วัน โดยการเปลี่ยนแปลงจะมีผลในรอบบิลถัดไป"
      },
      {
        q: "เอกสารที่ต้องใช้ในการเริ่มต้นมีอะไรบ้าง?",
        a: "ขึ้นอยู่กับประเภทของธุรกิจ โดยทั่วไปจะใช้สำเนาบัตรประชาชนและเอกสารจดทะเบียนบริษัท ทีมงานจะให้คำแนะนำอย่างละเอียดอีกครั้งเมื่อเริ่มต้นบริการ"
      },
      {
        q: "มีสัญญาผูกมัดระยะยาวหรือไม่?",
        a: "ไม่มีสัญญาผูกมัดระยะยาวครับ คุณสามารถใช้บริการเป็นรายเดือนและสามารถยกเลิกบริการได้โดยแจ้งล่วงหน้า 30 วัน"
      },
      {
        q: "ระยะเวลาในการตอบกลับเร็วแค่ไหน?",
        a: "สำหรับแพ็กเกจ Starter ภายใน 1 วันทำการ, Professional ภายใน 4 ชั่วโมง และ Enterprise จะได้รับการดูแลด่วนพิเศษภายใน 2 ชั่วโมงในช่วงเวลาทำการ"
      },
      {
        q: "หากต้องการยกเลิกบริการต้องทำอย่างไร?",
        a: "สามารถแจ้งยกเลิกบริการล่วงหน้า 30 วันผ่านช่องทางโทรศัพท์หรืออีเมล โดยไม่มีค่าธรรมเนียมการยกเลิกแอบแฝง"
      },
      {
        q: "รายงานประจำเดือนประกอบด้วยอะไรบ้าง?",
        a: "รายงานประจำเดือนจะสรุปงานที่ดำเนินการเสร็จสิ้น กำหนดการที่ใกล้เข้ามา เอกสารที่รอการดำเนินการ และคำแนะนำที่เหมาะสมกับสถานการณ์ของธุรกิจคุณ"
      },
      {
        q: "มีนโยบายการคืนเงินหรือไม่?",
        a: "เราไม่มีนโยบายคืนเงินสำหรับรอบบิลปัจจุบัน แต่คุณสามารถแจ้งยกเลิกบริการเพื่อไม่ให้เกิดการเรียกเก็บในรอบบิลถัดไปได้ตลอดเวลา"
      },
      {
        q: "ค่าบริการรวมค่าธรรมเนียมของรัฐบาลแล้วหรือไม่?",
        a: "ยังไม่รวมครับ แพ็กเกจครอบคลุมเฉพาะค่าบริการดำเนินการและคำปรึกษา ค่าธรรมเนียมหรือภาษีของรัฐบาลจะเรียกเก็บตามจริง"
      },
      {
        q: "ฉันสามารถขอคำปรึกษาได้กี่ครั้งต่อเดือน?",
        a: "แพ็กเกจ Starter ปรึกษาได้ 1 ครั้ง/เดือน, Professional 2 ครั้ง/เดือน และ Enterprise สามารถปรึกษาได้ไม่จำกัดจำนวนครั้งในช่วงเวลาทำการ"
      },
      {
        q: "ใครจะเป็นผู้ดูแลบัญชีของฉัน?",
        a: "คุณจะได้รับมอบหมายผู้ดูแลลูกค้าประจำตามระดับแพ็กเกจ โดยแพ็กเกจ Professional และ Enterprise จะดูแลโดยผู้เชี่ยวชาญระดับอาวุโสที่มีประสบการณ์ตรงในอุตสาหกรรมนั้นๆ"
      }
    ]
  },
  contact: {
    intro: "ไม่ว่าคุณกำลังเริ่มต้นธุรกิจ ต้องการแก้ปัญหาเรื่องเอกสาร หรือกำลังมองหาทีมที่ช่วยดูแลและติดตามงานอย่างต่อเนื่อง คุณสามารถส่งรายละเอียดเบื้องต้นให้เราได้ ทีมงานจะตรวจสอบข้อมูลและติดต่อกลับเพื่อแนะนำแนวทางที่เหมาะสม โดยไม่มีค่าใช้จ่ายสำหรับการพูดคุยเบื้องต้น",
    channels: {
      phone: "เหมาะสำหรับเรื่องเร่งด่วนหรือต้องการสอบถามข้อมูลเบื้องต้น",
      email: "เหมาะสำหรับส่งรายละเอียด เอกสาร หรือคำถามที่ต้องการคำตอบเป็นลายลักษณ์อักษร",
      line: "ช่องทางที่สะดวกสำหรับการติดตามงานและพูดคุยกับทีมบริการ",
      appointment: "เลือกวันและเวลาที่สะดวกเพื่อพูดคุยกับที่ปรึกษาเกี่ยวกับธุรกิจของคุณ"
    },
    trustText: [
      "ข้อมูลของคุณจะไม่ถูกส่งต่อให้บุคคลภายนอก",
      "ทีมงานจะติดต่อกลับภายใน 1 วันทำการ",
      "การปรึกษาเบื้องต้นไม่มีค่าใช้จ่าย",
      "เอกสารทุกชิ้นได้รับการดูแลอย่างเป็นความลับ"
    ]
  },
  footer: {
    companyDesc: "ผู้ให้บริการด้านการจัดการเอกสารแรงงานต่างด้าว บริการสมาชิกสำหรับธุรกิจ และคำปรึกษาด้านการบริหาร บัญชี อุตสาหกรรม และการเงิน เรามุ่งช่วยลดความซับซ้อนของงาน เพิ่มความถูกต้อง และสนับสนุนการเติบโตของลูกค้าอย่างต่อเนื่อง",
    officeHours: "จันทร์–ศุกร์ 09:00–18:00 น. (ปิดวันเสาร์–อาทิตย์และวันหยุดนักขัตฤกษ์)",
    responseTime: "ตอบกลับภายใน 1 วันทำการ",
    registration: "เลขทะเบียนบริษัท: XXXXXXXXXXXXX",
    ctaTitle: "พร้อมยกระดับการจัดการธุรกิจของคุณหรือยัง",
    ctaDesc: "พูดคุยกับทีมงานของเราเพื่อประเมินความต้องการ วางแผนขั้นตอน และค้นหารูปแบบบริการที่เหมาะกับธุรกิจของคุณ",
    ctaBtn1: "ขอรับคำปรึกษา",
    ctaBtn2: "ดูบริการทั้งหมด",
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "เงื่อนไขการให้บริการ"
  }
};

deepMerge(enData, newEn);
deepMerge(thData, newTh);

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(thPath, JSON.stringify(thData, null, 2));

console.log("Translations updated successfully.");
