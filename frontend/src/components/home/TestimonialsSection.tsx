import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { apiService } from '../../services/api';
import type { Testimonial } from '../../types';
import { useTranslation } from 'react-i18next';
import SectionDivider from '../common/SectionDivider';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} ดาว`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-[#C8A45D] fill-[#C8A45D]' : 'text-[#E7EBE8] fill-[#E7EBE8]'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function AvatarPlaceholder({ initials, name }: { initials: string; name: string }) {
  return (
    <div
      className="w-12 h-12 rounded-full bg-[#064E2B] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
      aria-label={name}
    >
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // We fetch from API, but if none/error, we will use fallback localized texts
    apiService.getTestimonials()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setTestimonials(res.data);
        } else {
          setFallbackTestimonials();
        }
      })
      .catch(() => {
        setFallbackTestimonials();
      });

    function setFallbackTestimonials() {
      // Create fallback from translations
      setTestimonials([
        {
          id: 1,
          name: t('testimonials.items.0.name', 'คุณสมศักดิ์ วิทยาธร'),
          company: t('testimonials.items.0.company', 'บริษัท อุตสาหกรรมโกลบอล จำกัด'),
          position: t('testimonials.items.0.position', 'ผู้จัดการฝ่ายบุคคล'),
          rating: 5,
          text: t('testimonials.items.0.text', 'PDA BLISS ช่วยจัดการเอกสารแรงงานต่างด้าวได้อย่างเป็นระบบ ทีมงานมีความเชี่ยวชาญสูง ตอบคำถามได้รวดเร็ว และงานที่ส่งมอบถูกต้องครบถ้วนทุกครั้ง ทำให้บริษัทของเราสามารถโฟกัสกับงานหลักได้อย่างเต็มที่'),
          avatar: null,
          initials: 'สว',
        },
        {
          id: 2,
          name: t('testimonials.items.1.name', 'คุณพรทิพย์ เจริญสุข'),
          company: t('testimonials.items.1.company', 'โรงงานผลิตเครื่องใช้ไฟฟ้า (ไทย) จำกัด'),
          position: t('testimonials.items.1.position', 'กรรมการผู้จัดการ'),
          rating: 5,
          text: t('testimonials.items.1.text', 'ใช้บริการสมาชิกมาแล้วกว่า 2 ปี ประทับใจมากในความรับผิดชอบและความรอบรู้ของทีมงาน ช่วยวางแผนและติดตามงานเอกสารได้อย่างต่อเนื่อง แนะนำให้ทุกธุรกิจใช้บริการนี้'),
          avatar: null,
          initials: 'พจ',
        },
        {
          id: 3,
          name: t('testimonials.items.2.name', 'คุณธนวัฒน์ รักษาวงษ์'),
          company: t('testimonials.items.2.company', 'บริษัท เน็กซอน อินดัสทรีส์ จำกัด'),
          position: t('testimonials.items.2.position', 'ผู้อำนวยการฝ่ายปฏิบัติการ'),
          rating: 5,
          text: t('testimonials.items.2.text', 'PDA BLISS ช่วยจัดการเอกสารได้ดีมาก ทีมงานมืออาชีพ ตอบไวและให้คำแนะนำที่เป็นประโยชน์ เราประหยัดเวลาและทรัพยากรได้มากขึ้นอย่างเห็นได้ชัด'),
          avatar: null,
          initials: 'ธร',
        }
      ]);
    }
  }, [t]);

  return (
    <section className="py-24 bg-[#F3F6F4] relative" aria-labelledby="testimonials-heading">
      {/* Background decoration */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#EAF8EF] rounded-full opacity-50 blur-[100px]" aria-hidden="true" />
      
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <SectionDivider 
          title={t('testimonials.title', 'เสียงจากลูกค้า')}
          subtitle={t('testimonials.subtitle', 'ความไว้วางใจที่ลูกค้าชั้นนำมีต่อ PDA BLISS')}
          variant="E"
          eyebrow={t('testimonials.badge', 'CLIENT STORIES')}
        />

        <div className="relative max-w-6xl mx-auto mt-12 cursor-grab active:cursor-grabbing">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            loop
            className="pb-20 pt-4 px-4 testimonials-swiper"
            aria-label="รีวิวจากลูกค้า"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="py-4">
                <motion.div
                  className="card-white p-8 md:p-10 h-full flex flex-col relative group mouse-spotlight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <div className="absolute top-8 right-8 text-[#19B965] opacity-20 group-hover:opacity-40 transition-opacity duration-300 group-hover:scale-110 transform" aria-hidden="true">
                    <Quote className="w-12 h-12" />
                  </div>

                  <div className="relative z-10 mb-6">
                    <StarRating rating={t.rating} />
                  </div>

                  <p className="text-[#0B0F0D] text-lg leading-relaxed mb-10 flex-1 relative z-10 font-medium italic">
                    "{t.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[#E7EBE8] relative z-10">
                    <AvatarPlaceholder initials={t.initials} name={t.name} />
                    <div>
                      <p className="font-bold text-[#0B0F0D] text-base">{t.name}</p>
                      <p className="text-[#3F4742] text-sm mt-0.5">{t.position}</p>
                      <p className="text-[#0E8F4D] text-sm font-bold mt-1">{t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
