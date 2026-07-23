import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Calendar, CheckCircle, AlertCircle, Building, User, Edit3, Send, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { apiService } from '../services/api';
import { useTranslation } from 'react-i18next';

const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full shadow-glow-green"
          style={{
            background: ['#19B965', '#9EE6BC', '#0E8F4D', '#EAF8EF'][i % 4],
            left: `${Math.random() * 100}%`,
            top: '50%',
          }}
          initial={{ opacity: 1, scale: 0, y: 0, x: 0 }}
          animate={{
            opacity: 0,
            scale: [0, 1.5, 1],
            y: -100 - Math.random() * 200,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

function LocationMap() {
  const [hasImage, setHasImage] = useState<boolean | null>(null);
  const { t } = useTranslation();

  return (
    <div className="img-radius-md overflow-hidden border-none bg-transparent flex-1 min-h-[260px] relative z-10 group/map">
      {/* Always show this layer — it reveals when image loads or stays as placeholder */}
      {hasImage !== true && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
          {/* Pulse Marker */}
          <div className="relative mb-4">
            <div className="w-14 h-14 rounded-full bg-[#19B965]/15 flex items-center justify-center border border-[#19B965]/30 group-hover/map:bg-[#19B965]/25 transition-colors">
              <MapPin className="w-7 h-7 text-[#19B965]" aria-hidden="true" />
            </div>
            <div className="absolute inset-0 rounded-full border border-[#19B965]/30 animate-ping opacity-40" aria-hidden="true" />
          </div>
          <p className="text-sm font-extrabold text-white mb-1">{COMPANY_INFO.nameFull}</p>
          <p className="text-xs text-white/85 font-medium leading-relaxed mb-3">{COMPANY_INFO.address}</p>
          <p className="text-[10px] text-white/40 leading-relaxed">{t('pricing.mapPlaceholder', 'วางรูปแผนที่ที่ public/location-map.png')}</p>
          {import.meta.env.VITE_GOOGLE_MAPS_URL && (
            <a
              href={import.meta.env.VITE_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#19B965] border border-[#19B965]/40 px-3 py-1.5 rounded-lg hover:bg-[#19B965] hover:text-[#0B0F0D] transition-all"
              aria-label={t('pricing.openMap', 'เปิดแผนที่')}
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {t('pricing.openMap', 'เปิดแผนที่')}
            </a>
          )}
        </div>
      )}
      {/* Image layer */}
      <img
        src="/location-map.png"
        alt={t('contact.mapAlt', 'แผนที่สำนักงาน บริษัท พีดีเอ บลิส จำกัด')}
        className={`w-full h-full object-cover object-center absolute inset-0 transition-all duration-500 group-hover/map:scale-[1.02] ${
          hasImage ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ minHeight: '260px' }}
        onLoad={() => setHasImage(true)}
        onError={() => setHasImage(false)}
      />
      {/* Gradient overlay when image shown */}
      {hasImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
      )}
      {/* Pin marker overlay when image is loaded */}
      {hasImage && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#064E2B]/90 backdrop-blur-sm px-3 py-2 rounded-full z-20 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-[#19B965] animate-pulse" aria-hidden="true" />
          <span className="text-white text-xs font-bold whitespace-nowrap">{COMPANY_INFO.nameFull}</span>
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const contactSchema = z.object({
    fullName: z.string().min(2, t('contact.form.errors.fullName', 'กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 ตัวอักษร')),
    companyName: z.string().optional().default(''),
    email: z.string().email(t('contact.form.errors.email', 'รูปแบบอีเมลไม่ถูกต้อง')),
    phone: z.string().regex(/^[0-9+\-\s()]{8,20}$/, t('contact.form.errors.phone', 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')),
    subject: z.string().min(1, t('contact.form.errors.subject', 'กรุณาเลือกหัวข้อ')),
    service: z.string().optional().default(''),
    message: z.string().min(10, t('contact.form.errors.message', 'กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร')),
    privacyAccepted: z.boolean().refine((v) => v === true, t('contact.form.errors.privacy', 'กรุณายอมรับนโยบายความเป็นส่วนตัว')),
  });
  
  type ContactFormData = z.infer<typeof contactSchema>;

  useEffect(() => {
    document.title = `${t('nav.contact', 'ติดต่อเรา')} | ${COMPANY_INFO.nameEn}`;
  }, [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { privacyAccepted: false },
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('loading');
    setErrorMessage('');
    try {
      const [res] = await Promise.all([
        apiService.submitContact(data),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
      if (res.success) {
        setSubmitState('success');
        reset();
        showToast('success', t('contact.form.success', 'ส่งข้อความเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด'));
        setTimeout(() => setSubmitState('idle'), 8000);
      } else {
        setSubmitState('error');
        setErrorMessage(res.message || t('contact.form.error', 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
        showToast('error', res.message || t('contact.form.error', 'เกิดข้อผิดพลาด'));
      }
    } catch {
      setSubmitState('error');
      setErrorMessage(t('contact.form.networkError', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง'));
      showToast('error', t('contact.form.networkError', 'ไม่สามารถเชื่อมต่อได้ กรุณาลองใหม่'));
    }
  };

  const trustTexts = t('contact.trustText', { returnObjects: true }) as string[];

  const contactChannels = [
    {
      id: 'phone',
      icon: Phone,
      label: t('contact.channels.phone.label', 'โทรหาเรา'),
      value: COMPANY_INFO.phone,
      desc: t('contact.channels.phone', 'เหมาะสำหรับเรื่องเร่งด่วนหรือต้องการสอบถามข้อมูลเบื้องต้น'),
      href: `tel:${COMPANY_INFO.phone}`,
      theme: 'card-dark mouse-spotlight',
      iconTheme: 'text-[#19B965]',
      iconBg: 'bg-white/10',
      textTheme: 'text-white'
    },
    {
      id: 'email',
      icon: Mail,
      label: t('contact.channels.email.label', 'อีเมล'),
      value: COMPANY_INFO.email,
      desc: t('contact.channels.email', 'เหมาะสำหรับส่งรายละเอียด เอกสาร หรือคำถามที่ต้องการคำตอบเป็นลายลักษณ์อักษร'),
      href: `mailto:${COMPANY_INFO.email}`,
      theme: 'bg-[#F3F6F4] border border-[#E7EBE8] hover:border-[#19B965] transition-colors mouse-spotlight',
      iconTheme: 'text-[#0E8F4D]',
      iconBg: 'bg-white',
      textTheme: 'text-[#0B0F0D]'
    },
    {
      id: 'line',
      icon: null,
      iconComponent: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.346 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      ),
      label: t('contact.channels.line.label', 'LINE OA'),
      value: COMPANY_INFO.lineOa,
      desc: t('contact.channels.line', 'ช่องทางที่สะดวกสำหรับการติดตามงานและพูดคุยกับทีมบริการ'),
      href: COMPANY_INFO.social.line,
      theme: 'card-green mouse-spotlight',
      iconTheme: 'text-white',
      iconBg: 'bg-[#19B965] shadow-glow-green',
      textTheme: 'text-[#064E2B]'
    },
    {
      id: 'appointment',
      icon: Calendar,
      label: t('contact.channels.appointment.label', 'นัดหมายที่ปรึกษา'),
      value: t('contact.channels.appointment.val', 'จองเวลาพูดคุย'),
      desc: t('contact.channels.appointment', 'เลือกวันและเวลาที่สะดวกเพื่อพูดคุยกับที่ปรึกษาเกี่ยวกับธุรกิจของคุณ'),
      href: '#contact-form',
      theme: 'card-white mouse-spotlight border border-[#E7EBE8]',
      iconTheme: 'text-[#0E8F4D]',
      iconBg: 'bg-[#F3F6F4]',
      textTheme: 'text-[#0B0F0D]'
    },
  ];

  return (
    <div className="pt-[72px] lg:pt-[78px] bg-[#FAFCFB]">
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`fixed top-24 right-4 z-[60] flex items-center gap-3 px-5 py-4 rounded-xl shadow-floating text-white max-w-sm ${
              toast.type === 'success' ? 'bg-[#19B965]' : 'bg-red-600'
            }`}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            role="alert"
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            )}
            <p className="text-sm font-bold">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative bg-[#FAFCFB] py-20 lg:py-32 overflow-hidden" aria-label={t('nav.contact', 'ติดต่อเรา')}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#19B965] opacity-5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0E8F4D] opacity-5 rounded-full blur-[120px]" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em]">
                {t('contact.badge', 'GET IN TOUCH')}
              </span>
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0B0F0D] leading-[1.1] mb-6">
              {t('contact.heroLine1', 'พร้อมพูดคุย')} <span className="text-[#0E8F4D]">{t('contact.heroLine2', 'และช่วยคุณวางแผนธุรกิจ')}</span>
            </h1>
            <p className="text-[#3F4742] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              {t('contact.intro')}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
               {trustTexts.map((text, i) => (
                 <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#E7EBE8]">
                   <CheckCircle className="w-4 h-4 text-[#19B965]" />
                   <span className="text-sm font-medium text-[#3F4742]">{text}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-12 bg-[#FAFCFB]" aria-labelledby="channels-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.id}
                  href={channel.href}
                  className={`rounded-[24px] p-6 flex flex-col items-start gap-4 group shadow-sm hover:shadow-floating transition-all duration-300 ${channel.theme}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  target={channel.id === 'line' ? '_blank' : undefined}
                  rel={channel.id === 'line' ? 'noopener noreferrer' : undefined}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 icon-animate ${channel.iconBg}`} aria-hidden="true">
                    {Icon ? <Icon className={`w-5 h-5 ${channel.iconTheme}`} /> : channel.iconComponent && <div className={channel.iconTheme}>{channel.iconComponent()}</div>}
                  </div>
                  <div>
                    <p className={`font-extrabold text-sm mb-1 opacity-90 ${channel.textTheme}`}>{channel.label}</p>
                    <p className={`text-base font-bold truncate mb-2 ${channel.textTheme}`}>{channel.value}</p>
                    <p className={`text-xs leading-relaxed ${channel.id === 'phone' ? 'text-white/85' : 'text-[#57615B]'}`}>{channel.desc}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Office Info */}
      <section id="contact-form" className="py-24 bg-white" aria-labelledby="form-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            
            {/* Form */}
            <div className="lg:col-span-3 card-white p-8 md:p-12 border border-[#E7EBE8]">
              <div className="mb-10">
                <h2 id="form-heading" className="text-3xl font-extrabold text-[#0B0F0D] mb-4">{t('contact.form.title', 'ส่งข้อความถึงเรา')}</h2>
                <div className="w-16 h-1 bg-[#19B965] rounded-full" aria-hidden="true" />
              </div>

              {submitState === 'success' ? (
                <motion.div
                  className="rounded-[24px] bg-[#EAF8EF] border border-[#9EE6BC] p-12 text-center relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Confetti />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#9EE6BC]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      <CheckCircle className="w-10 h-10 text-[#0E8F4D]" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-[#0B0F0D] mb-3">{t('contact.form.successTitle', 'ส่งข้อความเรียบร้อยแล้ว!')}</h3>
                    <p className="text-[#3F4742] font-medium">{t('contact.form.successDesc', 'เจ้าหน้าที่จะติดต่อกลับหาคุณโดยเร็วที่สุดภายใน 1 วันทำการ')}</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#57615B]">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        id="fullName"
                        type="text"
                        className={`peer w-full pl-11 pr-4 pt-5 pb-2 rounded-[12px] border bg-[#F3F6F4] text-[#0B0F0D] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#19B965] focus:border-[#19B965] focus:bg-white ${errors.fullName ? 'border-red-400 focus:ring-red-400 focus:border-red-500' : 'border-[#E7EBE8] hover:border-[#19B965]/50'} placeholder-transparent`}
                        placeholder={t('contact.form.fields.fullName', 'ชื่อ-นามสกุล')}
                        {...register('fullName')}
                        aria-required="true"
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      <label htmlFor="fullName" className="absolute left-11 top-1 text-xs font-bold text-[#57615B] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#57615B]/70 peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#19B965] cursor-text">
                        {t('contact.form.fields.fullName', 'ชื่อ-นามสกุล')} <span className="text-red-500">*</span>
                      </label>
                      {errors.fullName && <p id="fullName-error" className="text-red-500 text-xs mt-1 font-medium" role="alert">{errors.fullName.message}</p>}
                    </div>

                    {/* Company */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#57615B]">
                        <Building className="w-5 h-5" />
                      </div>
                      <input
                        id="companyName"
                        type="text"
                        className="peer w-full pl-11 pr-4 pt-5 pb-2 rounded-[12px] border bg-[#F3F6F4] text-[#0B0F0D] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#19B965] focus:border-[#19B965] focus:bg-white border-[#E7EBE8] hover:border-[#19B965]/50 placeholder-transparent"
                        placeholder={t('contact.form.fields.company', 'ชื่อบริษัท')}
                        {...register('companyName')}
                      />
                      <label htmlFor="companyName" className="absolute left-11 top-1 text-xs font-bold text-[#57615B] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#57615B]/70 peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#19B965] cursor-text">
                        {t('contact.form.fields.company', 'ชื่อบริษัท')}
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#57615B]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        className={`peer w-full pl-11 pr-4 pt-5 pb-2 rounded-[12px] border bg-[#F3F6F4] text-[#0B0F0D] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#19B965] focus:border-[#19B965] focus:bg-white ${errors.email ? 'border-red-400 focus:ring-red-400 focus:border-red-500' : 'border-[#E7EBE8] hover:border-[#19B965]/50'} placeholder-transparent`}
                        placeholder={t('contact.form.fields.email', 'อีเมล')}
                        {...register('email')}
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      <label htmlFor="email" className="absolute left-11 top-1 text-xs font-bold text-[#57615B] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#57615B]/70 peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#19B965] cursor-text">
                        {t('contact.form.fields.email', 'อีเมล')} <span className="text-red-500">*</span>
                      </label>
                      {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1 font-medium" role="alert">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#57615B]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        className={`peer w-full pl-11 pr-4 pt-5 pb-2 rounded-[12px] border bg-[#F3F6F4] text-[#0B0F0D] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#19B965] focus:border-[#19B965] focus:bg-white ${errors.phone ? 'border-red-400 focus:ring-red-400 focus:border-red-500' : 'border-[#E7EBE8] hover:border-[#19B965]/50'} placeholder-transparent`}
                        placeholder={t('contact.form.fields.phone', 'เบอร์โทรศัพท์')}
                        {...register('phone')}
                        aria-required="true"
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      <label htmlFor="phone" className="absolute left-11 top-1 text-xs font-bold text-[#57615B] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#57615B]/70 peer-focus:top-1 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#19B965] cursor-text">
                        {t('contact.form.fields.phone', 'เบอร์โทรศัพท์')} <span className="text-red-500">*</span>
                      </label>
                      {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1 font-medium" role="alert">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <select
                      id="subject"
                      className={`w-full px-4 pt-5 pb-2 rounded-[12px] border bg-[#F3F6F4] text-[#0B0F0D] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#19B965] focus:border-[#19B965] focus:bg-white appearance-none ${errors.subject ? 'border-red-400' : 'border-[#E7EBE8] hover:border-[#19B965]/50'}`}
                      {...register('subject')}
                      aria-required="true"
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      <option value="" disabled hidden></option>
                      {[
                        t('contact.subjects.general', 'สอบถามบริการทั่วไป'),
                        t('contact.subjects.foreignLabor', 'บริการจัดการเอกสารแรงงานต่างด้าว'),
                        t('contact.subjects.membership', 'บริการสมาชิก (Subscription)'),
                        t('contact.subjects.consulting', 'ที่ปรึกษาธุรกิจและการเงิน'),
                        t('contact.subjects.pricing', 'แพ็กเกจและราคา'),
                        t('contact.subjects.other', 'เรื่องอื่น ๆ'),
                      ].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <label htmlFor="subject" className="absolute left-4 top-1 text-xs font-bold text-[#57615B]">
                      {t('contact.form.fields.subject', 'หัวข้อ')} <span className="text-red-500">*</span>
                    </label>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#57615B]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.subject && <p id="subject-error" className="text-red-500 text-xs mt-1 font-medium" role="alert">{errors.subject.message}</p>}
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-[#57615B]">
                      <Edit3 className="w-5 h-5" />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      className={`peer w-full pl-11 pr-4 pt-6 pb-2 rounded-[12px] border bg-[#F3F6F4] text-[#0B0F0D] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#19B965] focus:border-[#19B965] focus:bg-white resize-none ${errors.message ? 'border-red-400 focus:ring-red-400 focus:border-red-500' : 'border-[#E7EBE8] hover:border-[#19B965]/50'} placeholder-transparent`}
                      placeholder={t('contact.form.fields.message', 'รายละเอียดเพิ่มเติม')}
                      {...register('message')}
                      aria-required="true"
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    <label htmlFor="message" className="absolute left-11 top-2 text-xs font-bold text-[#57615B] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#57615B]/70 peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#19B965] cursor-text">
                      {t('contact.form.fields.message', 'รายละเอียด')} <span className="text-red-500">*</span>
                    </label>
                    {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1 font-medium" role="alert">{errors.message.message}</p>}
                  </div>

                  {/* Privacy */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-5 h-5 border-2 border-[#E7EBE8] rounded-[6px] focus:ring-2 focus:ring-[#19B965] focus:ring-offset-2 checked:bg-[#19B965] checked:border-[#19B965] transition-all duration-200 cursor-pointer"
                          {...register('privacyAccepted')}
                          aria-describedby={errors.privacyAccepted ? 'privacy-error' : undefined}
                        />
                        <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200" />
                      </div>
                      <span className="text-sm text-[#57615B] leading-relaxed group-hover:text-[#0B0F0D] transition-colors">
                        {t('contact.form.privacy1', 'ข้าพเจ้ายอมรับ')}{' '}
                        <a href="/privacy" className="text-[#0E8F4D] font-bold hover:text-[#19B965] hover:underline transition-colors">{t('contact.form.privacyLink', 'นโยบายความเป็นส่วนตัว')}</a>
                        {' '}{t('contact.form.privacy2', 'และยินยอมให้ PDA BLISS ติดต่อกลับตามข้อมูลที่ให้ไว้')}
                      </span>
                    </label>
                    {errors.privacyAccepted && <p id="privacy-error" className="text-red-500 text-xs mt-1 font-medium ml-8" role="alert">{errors.privacyAccepted.message}</p>}
                  </div>

                  {/* Error message */}
                  {submitState === 'error' && errorMessage && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-[12px] bg-red-50 border border-red-100 text-red-700 text-sm font-bold" role="alert">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                      {errorMessage}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className="w-full btn-primary !rounded-[12px] !py-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-busy={submitState === 'loading'}
                  >
                    {submitState === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                        {t('common.loading', 'กำลังโหลด...')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform arrow-animate" aria-hidden="true" />
                        {t('contact.form.submit', 'ส่งข้อความ')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Office Info & Map */}
            <div className="lg:col-span-2">
              <div className="bg-[#0B0F0D] rounded-2xl shadow-floating p-8 md:p-10 text-white relative overflow-hidden h-full flex flex-col animated-border border border-[#19B965]/50 mouse-spotlight">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#0E8F4D]/10 rounded-full blur-[50px] pointer-events-none" />
                
                <h2 className="text-2xl font-extrabold mb-8 relative z-10 text-white">{t('contact.office.title', 'ข้อมูลสำนักงาน')}</h2>

                <div className="space-y-6 mb-10 relative z-10">
                  {[
                    { icon: MapPin, label: t('contact.office.address', 'ที่อยู่'), value: COMPANY_INFO.address, href: null },
                    { icon: Clock, label: t('contact.office.hours', 'เวลาทำการ'), value: COMPANY_INFO.businessHours, href: null },
                    { icon: Phone, label: t('contact.office.phone', 'โทรศัพท์'), value: COMPANY_INFO.phone, href: `tel:${COMPANY_INFO.phone}` },
                    { icon: Mail, label: t('contact.office.email', 'อีเมล'), value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 group/item">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#19B965] flex-shrink-0 group-hover/item:bg-[#19B965] group-hover/item:text-[#0B0F0D] transition-colors duration-300 border border-white/10 icon-animate" aria-hidden="true">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="pt-1">
                          <p className="text-xs font-bold text-[#57615B] mb-1 tracking-wide">{item.label}</p>
                          {item.href ? (
                            <a href={item.href} className="text-sm font-medium hover:text-[#9EE6BC] transition-colors text-white">
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium leading-relaxed text-white">{item.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Location Map — uses /location-map.png with graceful fallback */}
                <LocationMap />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Quick Help CTA */}
      <section className="py-16 bg-[#064E2B] relative overflow-hidden" aria-label="ต้องการความช่วยเหลือด่วน">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[#042218]/40 border border-[#19B965]/20 rounded-[24px] p-8 md:p-12 backdrop-blur-sm">
            <div className="flex items-center gap-6 text-white text-center md:text-left flex-col md:flex-row">
              <div className="w-16 h-16 rounded-full bg-[#19B965]/20 flex items-center justify-center flex-shrink-0 shadow-glow-green" aria-hidden="true">
                <Phone className="w-8 h-8 text-[#19B965]" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold mb-2">{t('contact.quickHelp.title', 'ต้องการความช่วยเหลือด่วน?')}</h2>
                <p className="text-white/85 text-base">{t('contact.quickHelp.desc', 'ทีมงานพร้อมดูแลและตอบคำถามของคุณอย่างรวดเร็ว')}</p>
              </div>
            </div>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="btn-primary !rounded-[12px] !py-4 !px-8 whitespace-nowrap"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {t('contact.quickHelp.btn', 'คุยกับเรา')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
