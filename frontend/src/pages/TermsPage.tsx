import { useEffect } from 'react';
import { COMPANY_INFO } from '../data/company';

export default function TermsPage() {
  useEffect(() => {
    document.title = `เงื่อนไขการใช้งาน | ${COMPANY_INFO.nameEn}`;
  }, []);

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-6">เงื่อนไขการใช้งาน</h1>
        <p className="text-gray-500 mb-8">อัปเดตล่าสุด: มกราคม 2025</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">1. การยอมรับเงื่อนไข</h2>
            <p className="text-gray-600 leading-relaxed">การใช้งานเว็บไซต์และบริการของ PDA BLISS COMPANY LIMITED ถือว่าคุณยอมรับเงื่อนไขการใช้งานฉบับนี้ทุกประการ</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">2. ขอบเขตการให้บริการ</h2>
            <p className="text-gray-600 leading-relaxed">PDA BLISS ให้บริการด้านเอกสารแรงงานต่างด้าว บริการสมาชิก และที่ปรึกษาธุรกิจตามที่ระบุในสัญญาบริการ</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">3. ทรัพย์สินทางปัญญา</h2>
            <p className="text-gray-600 leading-relaxed">เนื้อหา โลโก้ และองค์ประกอบทั้งหมดบนเว็บไซต์เป็นทรัพย์สินของ PDA BLISS COMPANY LIMITED ห้ามนำไปใช้โดยไม่ได้รับอนุญาต</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">4. ข้อจำกัดความรับผิดชอบ</h2>
            <p className="text-gray-600 leading-relaxed">PDA BLISS จะไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้หรือไม่สามารถใช้บริการได้ เว้นแต่กรณีที่เกิดจากความประมาทเลินเล่ออย่างร้ายแรง</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-dark-900 mb-3">5. ติดต่อเรา</h2>
            <p className="text-gray-600 leading-relaxed">หากคุณมีคำถามเกี่ยวกับเงื่อนไขการใช้งาน กรุณาติดต่อ {COMPANY_INFO.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
