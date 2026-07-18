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

const newEn = {
  testimonials: {
    items: [
      {
        name: "Somsak Witthayathorn",
        company: "Global Manufacturing Co., Ltd.",
        position: "HR Manager",
        text: "PDA BLISS manages our migrant documentation systematically. The team is highly skilled, responds quickly, and always delivers accurate work. Having a reliable partner like them allows our HR team to focus entirely on developing our core business rather than worrying about regulatory issues.",
        service: "Migrant Worker Documentation",
        result: "Reduced processing time by 40%"
      },
      {
        name: "Pornthip Charoensuk",
        company: "Thai Electronics Factory",
        position: "Managing Director",
        text: "We've been using their membership service for over 2 years and are highly impressed with their responsibility and knowledge. They help plan and track document workflows continuously. I highly recommend their services to any business aiming for long-term stability.",
        service: "Business Membership Service",
        result: "Zero compliance issues in 2 years"
      },
      {
        name: "Thanawat Raksawong",
        company: "Nexon Industries Ltd.",
        position: "Operations Director",
        text: "PDA BLISS helps manage documents exceptionally well. Their professional team replies fast and provides incredibly useful advice. We have saved a massive amount of time and resources that would have otherwise been spent navigating complex regulations.",
        service: "Migrant Worker Documentation",
        result: "Saved 20+ hours per month"
      },
      {
        name: "Sutida Chansiri",
        company: "Oceanic Supply Chain",
        position: "Logistics Manager",
        text: "In the logistics industry, time is everything. The team at PDA BLISS understands this perfectly. They handled our complex multi-branch paperwork flawlessly and provided a clear roadmap. It is refreshing to work with a team that truly cares about our operational deadlines.",
        service: "Business Consulting",
        result: "Streamlined multi-branch operations"
      },
      {
        name: "Kittipong Techawin",
        company: "Vertex Solutions",
        position: "CEO",
        text: "As a technology startup, we needed a partner who could handle the heavy lifting of administrative and compliance tasks. PDA BLISS provided exact what we needed. Their monthly updates and clear communication give us the peace of mind to focus on product development.",
        service: "Business Membership Service",
        result: "Improved focus on core business"
      },
      {
        name: "Malinee Srichan",
        company: "Greenfield Export",
        position: "Financial Controller",
        text: "Their financial pathway consulting has been a game-changer for us. They didn't just give us generic advice; they analyzed our specific costs and processes. The recommendations were practical, actionable, and have significantly improved our liquidity and planning.",
        service: "Financial Consulting",
        result: "Increased operational liquidity"
      },
      {
        name: "Arunee Phokham",
        company: "Prime Retail Group",
        position: "Store Operations Lead",
        text: "Managing compliance across multiple retail locations used to be a nightmare. Since partnering with PDA BLISS, everything is centralized and tracked systematically. Their team's proactive alerts mean we never miss a deadline. Truly a five-star service.",
        service: "Migrant Worker Documentation",
        result: "100% deadline compliance across 15 stores"
      },
      {
        name: "Wanchai Prateep",
        company: "Blue Ridge Construction",
        position: "Project Director",
        text: "Construction projects require a flexible yet reliable workforce. PDA BLISS ensures that all our workforce documentation is handled swiftly and legally. Their deep understanding of our industry constraints makes them an invaluable extension of our own team.",
        service: "Business Membership Service",
        result: "Faster project mobilization"
      }
    ]
  }
};

const newTh = {
  testimonials: {
    items: [
      {
        name: "สมศักดิ์ วิทยาธร",
        company: "บริษัท อุตสาหกรรมโกลบอล จำกัด",
        position: "ผู้จัดการฝ่ายบุคคล",
        text: "PDA BLISS ช่วยจัดการเอกสารแรงงานต่างด้าวได้อย่างเป็นระบบ ทีมงานมีความเชี่ยวชาญสูง ตอบคำถามได้รวดเร็ว และงานที่ส่งมอบถูกต้องครบถ้วนทุกครั้ง ทำให้ทีม HR ของเราสามารถโฟกัสกับการพัฒนาธุรกิจหลักได้อย่างเต็มที่โดยไม่ต้องกังวลเรื่องกฎระเบียบ",
        service: "บริการจัดการเอกสารแรงงานต่างด้าว",
        result: "ลดระยะเวลาดำเนินการได้ถึง 40%"
      },
      {
        name: "พรทิพย์ เจริญสุข",
        company: "โรงงานผลิตเครื่องใช้ไฟฟ้า (ไทย)",
        position: "กรรมการผู้จัดการ",
        text: "ใช้บริการสมาชิกมาแล้วกว่า 2 ปี ประทับใจมากในความรับผิดชอบและความรอบรู้ของทีมงาน ช่วยวางแผนและติดตามงานเอกสารได้อย่างต่อเนื่อง ขอแนะนำให้ทุกธุรกิจที่ต้องการความมั่นคงระยะยาวใช้บริการนี้",
        service: "บริการสมาชิกสำหรับธุรกิจ",
        result: "ไม่มีปัญหาด้านเอกสารตลอด 2 ปี"
      },
      {
        name: "ธนวัฒน์ รักษาวงษ์",
        company: "บริษัท เน็กซอน อินดัสทรีส์ จำกัด",
        position: "ผู้อำนวยการฝ่ายปฏิบัติการ",
        text: "PDA BLISS ช่วยจัดการเอกสารได้ดีมาก ทีมงานมืออาชีพ ตอบไวและให้คำแนะนำที่เป็นประโยชน์ เราประหยัดเวลาและทรัพยากรที่ต้องใช้ในการจัดการกับข้อบังคับที่ซับซ้อนไปได้อย่างมหาศาล",
        service: "บริการจัดการเอกสารแรงงานต่างด้าว",
        result: "ประหยัดเวลามากกว่า 20 ชั่วโมง/เดือน"
      },
      {
        name: "สุธิดา ชาญศิริ",
        company: "บริษัท โอเชียนิค ซัพพลายเชน จำกัด",
        position: "ผู้จัดการฝ่ายโลจิสติกส์",
        text: "ในอุตสาหกรรมโลจิสติกส์ เวลาคือสิ่งสำคัญที่สุด ทีมงาน PDA BLISS เข้าใจเรื่องนี้เป็นอย่างดี พวกเขาจัดการเอกสารหลายสาขาที่ซับซ้อนของเราได้อย่างไร้ที่ติ และวางแผนงานให้ชัดเจน รู้สึกอุ่นใจที่ได้ทำงานกับทีมที่ใส่ใจเรื่องกำหนดเวลาของเราจริงๆ",
        service: "ที่ปรึกษาด้านธุรกิจ",
        result: "เพิ่มประสิทธิภาพการทำงานหลายสาขา"
      },
      {
        name: "กิตติพงษ์ เตชะวิน",
        company: "เวอร์เท็กซ์ โซลูชั่นส์",
        position: "ประธานเจ้าหน้าที่บริหาร",
        text: "ในฐานะสตาร์ทอัพเทคโนโลยี เราต้องการพันธมิตรที่ช่วยจัดการงานเอกสารและกฎระเบียบที่ยุ่งยาก PDA BLISS ตอบโจทย์เราได้ตรงจุด การอัปเดตงานรายเดือนและการสื่อสารที่ชัดเจนช่วยให้เรามีเวลาโฟกัสกับการพัฒนาผลิตภัณฑ์ได้อย่างเต็มที่",
        service: "บริการสมาชิกสำหรับธุรกิจ",
        result: "มีเวลาโฟกัสกับธุรกิจหลักมากขึ้น"
      },
      {
        name: "มาลินี ศรีจันทร์",
        company: "บริษัท กรีนฟิลด์ เอ็กซ์ปอร์ต จำกัด",
        position: "ผู้อำนวยการฝ่ายการเงิน",
        text: "คำปรึกษาด้านการเงินของที่นี่ช่วยเราได้มาก พวกเขาไม่ได้ให้แค่คำแนะนำทั่วไป แต่มาช่วยวิเคราะห์ต้นทุนและกระบวนการทำงานแบบเจาะลึก คำแนะนำที่ได้สามารถนำไปปฏิบัติจริงและช่วยเพิ่มสภาพคล่องให้กับการวางแผนธุรกิจของเราอย่างเห็นได้ชัด",
        service: "ที่ปรึกษาด้านการเงิน",
        result: "เพิ่มสภาพคล่องในการดำเนินงาน"
      },
      {
        name: "อรุณี โพธิ์คำ",
        company: "กลุ่มบริษัท ไพร์ม รีเทล",
        position: "หัวหน้าฝ่ายปฏิบัติการสาขา",
        text: "การจัดการเอกสารหลายสาขาเคยเป็นเรื่องน่าปวดหัว แต่ตั้งแต่ร่วมงานกับ PDA BLISS ทุกอย่างถูกจัดการรวมศูนย์และติดตามอย่างเป็นระบบ การแจ้งเตือนล่วงหน้าของทีมงานทำให้เราไม่พลาดกำหนดเวลาเลย เป็นบริการระดับห้าดาวจริงๆ",
        service: "บริการจัดการเอกสารแรงงานต่างด้าว",
        result: "จัดการเอกสารตรงเวลา 100% ทั่วทั้ง 15 สาขา"
      },
      {
        name: "วันชัย ประทีป",
        company: "บริษัท บลูริดจ์ คอนสตรัคชั่น จำกัด",
        position: "ผู้อำนวยการโครงการ",
        text: "โครงการก่อสร้างต้องการทีมงานที่ยืดหยุ่นและเชื่อถือได้ PDA BLISS ช่วยให้มั่นใจว่าเอกสารของทีมงานทุกคนถูกต้องตามกฎหมายและดำเนินการอย่างรวดเร็ว ความเข้าใจลึกซึ้งในข้อจำกัดของอุตสาหกรรมเราทำให้พวกเขาเป็นเหมือนทีมงานของเราเอง",
        service: "บริการสมาชิกสำหรับธุรกิจ",
        result: "เริ่มงานโครงการได้รวดเร็วขึ้น"
      }
    ]
  }
};

deepMerge(enData, newEn);
deepMerge(thData, newTh);

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(thPath, JSON.stringify(thData, null, 2));

console.log("Testimonials updated successfully.");
