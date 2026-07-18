import { useEffect } from 'react';
import { COMPANY_INFO } from '../data/company';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = `นโยบายความเป็นส่วนตัว | ${COMPANY_INFO.nameEn}`;
  }, []);

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-6">นโยบายความเป็นส่วนตัว</h1>
        <p className="text-gray-500 mb-8">อัปเดตล่าสุด: มกราคม 2025</p>
        
        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">1. การเก็บรวบรวมข้อมูล</h2>
            <p className="text-gray-600 leading-relaxed">PDA BLISS COMPANY LIMITED เก็บรวบรวมข้อมูลส่วนบุคคลของคุณเมื่อคุณติดต่อเรา สมัครบริการ หรือใช้งานเว็บไซต์ ข้อมูลที่เก็บรวบรวมได้แก่ ชื่อ อีเมล เบอร์โทรศัพท์ และข้อมูลธุรกิจที่เกี่ยวข้อง</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">2. การใช้ข้อมูล</h2>
            <p className="text-gray-600 leading-relaxed">ข้อมูลของคุณจะถูกใช้เพื่อให้บริการ ติดต่อกลับ ปรับปรุงบริการ และส่งข้อมูลที่เกี่ยวข้องกับบริการของเราเท่านั้น</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">3. การรักษาความปลอดภัย</h2>
            <p className="text-gray-600 leading-relaxed">เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึง การเปิดเผย หรือการนำไปใช้โดยไม่ได้รับอนุญาต</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">4. ติดต่อเรา</h2>
            <p className="text-gray-600 leading-relaxed">หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อเราที่ {COMPANY_INFO.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
