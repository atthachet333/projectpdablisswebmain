import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Sparkles, Info, Star, Building2, Users, Zap, ArrowRight, ShieldCheck, ChevronDown, ChevronUp, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';
import Accordion from '../components/common/Accordion';
import CTASection from '../components/common/CTASection';
import { apiService } from '../services/api';
import { COMPANY_INFO } from '../data/company';
import type { Package, Faq } from '../types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Tooltip component
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="pricing-tooltip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={text}
      onClick={() => setOpen(!open)}
    >
      {children}
      {open && (
        <span className="tooltip-content" role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}

// Feature row with optional tooltip
function FeatureItem({ text, included, isDark, isHighlighted, tooltip }: {
  text: string;
  included: boolean;
  isDark: boolean;
  isHighlighted: boolean;
  tooltip?: string;
}) {
  return (
    <li className="flex items-start gap-3">
      {included ? (
        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isHighlighted ? 'bg-[#9EE6BC]/20' : isDark ? 'bg-white/10' : 'bg-[#EAF8EF]'
        }`}>
          <Check className={`w-3 h-3 ${isHighlighted ? 'text-[#9EE6BC]' : isDark ? 'text-white' : 'text-[#19B965]'}`} aria-hidden="true" />
        </div>
      ) : (
        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Minus className={`w-4 h-4 ${isDark ? 'text-white/25' : 'text-[#CBD5C0]'}`} aria-hidden="true" />
        </div>
      )}
      <span className={`text-sm leading-relaxed flex items-center gap-1.5 ${included
        ? (isDark ? 'text-white/90 font-medium' : 'text-[#0B0F0D] font-medium')
        : (isDark ? 'text-white/55' : 'text-[#7E8A82]')}`}
      >
        {text}
        {tooltip && included && (
          <Tooltip text={tooltip}>
            <Info className="w-3.5 h-3.5 opacity-50 hover:opacity-100 cursor-help inline-flex flex-shrink-0" aria-hidden="true" />
          </Tooltip>
        )}
      </span>
    </li>
  );
}

// Collapsible feature group
function FeatureGroup({ label, items, isDark, isHighlighted }: {
  label: string;
  items: Array<{ text: string; included: boolean; tooltip?: string }>;
  isDark: boolean;
  isHighlighted: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4">
      <button
        className={`w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 py-1.5 px-2 rounded-lg transition-colors ${
          isDark ? 'text-white/50 hover:text-white/85 hover:bg-white/5' : 'text-[#57615B] hover:text-[#3F4742] hover:bg-[#F3F6F4]'
        }`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2.5 px-1"
          >
            {items.map((item, i) => (
              <FeatureItem key={i} {...item} isDark={isDark} isHighlighted={isHighlighted} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}



function ComparisonStrip({ t }: { t: Function }) {
  // ── 15-row comparison data with categories and descriptions ──
  type CellStatus = 'yes' | 'no' | 'partial';
  type CompRow = {
    label: string;
    desc: string;
    starter: { status: CellStatus; text: string };
    pro: { status: CellStatus; text: string };
    enterprise: { status: CellStatus; text: string };
  };
  type Category = { title: string; icon: string; rows: CompRow[] };

  const categories: Category[] = [
    {
      title: 'การติดต่อ & การตอบกลับ',
      icon: '📞',
      rows: [
        {
          label: 'เวลาตอบกลับ',
          desc: 'ระยะเวลาเฉลี่ยที่ทีมงานจะติดต่อกลับในวันทำการ',
          starter: { status: 'partial', text: 'ภายใน 2 วันทำการ' },
          pro:     { status: 'yes',     text: 'ภายใน 1 วันทำการ' },
          enterprise: { status: 'yes',  text: 'ภายใน 4–8 ชั่วโมง' },
        },
        {
          label: 'ช่องทางติดต่อ',
          desc: 'รูปแบบช่องทางที่ลูกค้าสามารถติดต่อทีมงานได้',
          starter: { status: 'partial', text: 'ช่องทางมาตรฐาน' },
          pro:     { status: 'yes',     text: 'ช่องทางลำดับสูง' },
          enterprise: { status: 'yes',  text: 'ช่องทางด่วนเฉพาะ' },
        },
        {
          label: 'การแจ้งเตือนล่วงหน้า',
          desc: 'แจ้งเตือนเมื่อเอกสารใกล้หมดอายุหรือมีงานสำคัญ',
          starter: { status: 'partial', text: 'แจ้งเตือนพื้นฐาน' },
          pro:     { status: 'yes',     text: 'แจ้งเตือนละเอียด' },
          enterprise: { status: 'yes',  text: 'แจ้งเตือนเต็มรูปแบบ' },
        },
      ],
    },
    {
      title: 'การติดตามงาน',
      icon: '📋',
      rows: [
        {
          label: 'ระดับการติดตาม',
          desc: 'ความลึกของการติดตามสถานะงานและเอกสารของลูกค้า',
          starter: { status: 'partial', text: 'ติดตามขั้นพื้นฐาน' },
          pro:     { status: 'yes',     text: 'ติดตามเชิงลึก' },
          enterprise: { status: 'yes',  text: 'ติดตามหลายโปรเจกต์' },
        },
        {
          label: 'รองรับหลายสาขา',
          desc: 'สามารถดูแลธุรกิจที่มีสาขาหรือแผนกหลายจุด',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'partial', text: 'บางกรณี' },
          enterprise: { status: 'yes', text: 'รองรับเต็มรูปแบบ' },
        },
        {
          label: 'รองรับหลายแผนก',
          desc: 'ดูแลประสานงานระหว่างหลายแผนกในองค์กรเดียว',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'partial', text: 'จำกัด' },
          enterprise: { status: 'yes', text: 'รองรับทุกแผนก' },
        },
      ],
    },
    {
      title: 'การให้คำปรึกษา',
      icon: '💬',
      rows: [
        {
          label: 'จำนวน Session ต่อเดือน',
          desc: 'ครั้งที่สามารถนัดปรึกษาผู้เชี่ยวชาญโดยตรง',
          starter: { status: 'partial', text: '1 ครั้ง/เดือน' },
          pro:     { status: 'yes',     text: '3 ครั้ง/เดือน' },
          enterprise: { status: 'yes',  text: 'ตามขอบเขตที่ตกลง' },
        },
        {
          label: 'ที่ปรึกษาเฉพาะทาง',
          desc: 'เข้าถึงทีมผู้เชี่ยวชาญเฉพาะด้านตามประเภทธุรกิจ',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'partial', text: 'ทีม Shared' },
          enterprise: { status: 'yes', text: 'เชี่ยวชาญเฉพาะอุตสาหกรรม' },
        },
        {
          label: 'การวางแผนธุรกิจ',
          desc: 'สนับสนุนการวางแผนปฏิบัติการและเอกสารรายเดือน',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'yes',   text: 'วางแผนรายเดือน' },
          enterprise: { status: 'yes', text: 'รายเดือน + รายไตรมาส' },
        },
      ],
    },
    {
      title: 'รายงาน & สรุปผล',
      icon: '📊',
      rows: [
        {
          label: 'รายงานประจำเดือน',
          desc: 'สรุปงานที่เสร็จสิ้น กำหนดการล่วงหน้า และคำแนะนำ',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'yes',   text: 'รายงานสรุปรายเดือน' },
          enterprise: { status: 'yes', text: 'รายงานผู้บริหาร' },
        },
        {
          label: 'รายงานความเสี่ยง',
          desc: 'วิเคราะห์ความเสี่ยงและให้คำแนะนำเชิงรุก',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'no',    text: 'ไม่รวม' },
          enterprise: { status: 'yes', text: 'รายงานความเสี่ยงเต็มรูปแบบ' },
        },
        {
          label: 'Dashboard & Analytics',
          desc: 'ภาพรวมสถานะงานและตัวชี้วัดสำคัญแบบ Real-time',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'partial', text: 'สรุปพื้นฐาน' },
          enterprise: { status: 'yes', text: 'Dashboard ครบครัน' },
        },
      ],
    },
    {
      title: 'การจัดการบัญชี',
      icon: '🧑‍💼',
      rows: [
        {
          label: 'ผู้ดูแลบัญชีประจำ',
          desc: 'บุคคลที่รับผิดชอบดูแลบัญชีของลูกค้าโดยตรง',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'partial', text: 'ทีม Shared' },
          enterprise: { status: 'yes', text: 'Account Manager ส่วนตัว' },
        },
        {
          label: 'บริการปรับแต่งพิเศษ',
          desc: 'ออกแบบรูปแบบบริการให้ตรงกับความต้องการเฉพาะองค์กร',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'no',    text: 'ไม่รวม' },
          enterprise: { status: 'yes', text: 'ปรับแต่งเต็มรูปแบบ' },
        },
        {
          label: 'ประชุมทบทวนรายไตรมาส',
          desc: 'นัดประชุมเพื่อทบทวนผลงานและวางแผนไตรมาสถัดไป',
          starter: { status: 'no',    text: 'ไม่รวม' },
          pro:     { status: 'no',    text: 'ไม่รวม' },
          enterprise: { status: 'yes', text: 'ทุกไตรมาส' },
        },
      ],
    },
  ];

  const statusIcon = (status: CellStatus, isPro: boolean) => {
    if (status === 'yes') {
      return (
        <CheckCircle2
          className={`w-5 h-5 inline-block tick-wave ${isPro ? 'text-[#9EE6BC]' : 'text-[#19B965]'}`}
          style={isPro ? {} : { filter: 'drop-shadow(0 0 4px rgba(25,185,101,0.4))' }}
        />
      );
    }
    if (status === 'no') {
      return (
        <XCircle
          className={`w-5 h-5 inline-block ${isPro ? 'text-[#9EE6BC]/30' : 'text-[#CBD5C0]'}`}
        />
      );
    }
    return (
      <MinusCircle
        className={`w-5 h-5 inline-block ${isPro ? 'text-[#9EE6BC]/50' : 'text-[#A8B0AA]'}`}
      />
    );
  };

  return (
    <div className="mt-24 mb-4" id="pricing-comparison">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.22em] mb-4 bg-[#EAF8EF] px-5 py-2 rounded-full border border-[#9EE6BC]">
          {t('pricing.comparison.title', 'เปรียบเทียบแพ็กเกจ')}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#0B0F0D] mb-3">
          {t('pricing.whichPackage', 'เลือกแพ็กเกจที่ใช่สำหรับคุณ')}
        </h3>
        <p className="text-[#57615B] text-sm md:text-base max-w-xl mx-auto">
          {t('pricing.comparison.subtitle', 'เปรียบเทียบฟีเจอร์ครบทุกด้านในแต่ละแพ็กเกจ')}
        </p>
      </motion.div>

      {/* Table */}
      <motion.div
        className="comparison-scroll rounded-[24px] border border-[#E7EBE8] bg-white shadow-[0_8px_40px_rgba(11,15,13,0.08)] overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <table className="w-full text-sm min-w-[680px] border-collapse" role="table">
          <caption className="sr-only">{t('pricing.comparison.title', 'เปรียบเทียบแพ็กเกจ')}</caption>

          {/* ── HEADER ── */}
          <thead>
            <tr className="border-b-2 border-[#E7EBE8]">
              {/* Feature col header */}
              <th
                scope="col"
                className="sticky left-0 z-20 text-left py-6 px-6 font-bold text-[#57615B] text-xs uppercase tracking-widest bg-[#F7F9F8] border-r border-[#E7EBE8] w-[36%] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]"
              >
                {t('pricing.comparison.featureHeader', 'ฟีเจอร์')}
              </th>

              {/* Starter */}
              <th scope="col" className="py-6 px-6 font-bold text-center bg-[#F7F9F8] w-[21%]">
                <div className="flex flex-col items-center gap-1">
                  <span className="w-8 h-8 rounded-full bg-[#EAF8EF] border border-[#9EE6BC] flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-[#0E8F4D]" />
                  </span>
                  <span className="text-[#0B0F0D] font-extrabold text-sm">{t('pricing.comparison.starterHeader', 'Starter')}</span>
                  <span className="text-[10px] text-[#7E8A82] font-normal tracking-wide">฿990/เดือน</span>
                </div>
              </th>

              {/* Professional — highlighted */}
              <th scope="col" className="py-6 px-6 font-bold text-center bg-[#064E2B] w-[21%] relative overflow-hidden">
                {/* Neon animated top border */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#19B965] to-transparent animate-[glowLinePulse_3s_ease-in-out_infinite]" />
                <div className="flex flex-col items-center gap-1">
                  <span className="w-8 h-8 rounded-full bg-[#19B965]/20 border border-[#9EE6BC]/40 flex items-center justify-center mb-1">
                    <Sparkles className="w-4 h-4 text-[#9EE6BC]" />
                  </span>
                  <span className="text-white font-extrabold text-sm">{t('pricing.comparison.proHeader', 'Professional')}</span>
                  <span className="text-[10px] text-[#9EE6BC]/70 font-normal tracking-wide">฿2,990/เดือน</span>
                </div>
                {/* Popular badge */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#19B965] text-[#064E2B] text-[9px] font-extrabold px-3 py-0.5 rounded-b-lg uppercase tracking-widest whitespace-nowrap shadow-[0_2px_10px_rgba(25,185,101,0.5)]">
                  ⭐ {t('pricing.badge.pro', 'ยอดนิยม')}
                </span>
              </th>

              {/* Enterprise */}
              <th scope="col" className="py-6 px-6 font-bold text-center bg-[#F7F9F8] w-[21%]">
                <div className="flex flex-col items-center gap-1">
                  <span className="w-8 h-8 rounded-full bg-[#0B0F0D]/05 border border-[#E7EBE8] flex items-center justify-center mb-1">
                    <Building2 className="w-4 h-4 text-[#3F4742]" />
                  </span>
                  <span className="text-[#0B0F0D] font-extrabold text-sm">{t('pricing.comparison.enterpriseHeader', 'Enterprise')}</span>
                  <span className="text-[10px] text-[#7E8A82] font-normal tracking-wide">฿6,990/เดือน</span>
                </div>
              </th>
            </tr>
          </thead>

          {/* ── BODY ── */}
          <tbody>
            {categories.map((cat, catIdx) => (
              <React.Fragment key={`cat-${catIdx}`}>
                {/* Category separator row */}
                <tr className="category-row-th">
                  <td
                    colSpan={4}
                    className="py-3 px-6 text-xs font-extrabold text-[#064E2B] uppercase tracking-[0.18em] border-b border-[#E7EBE8]"
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.title}
                  </td>
                </tr>

                {/* Feature rows */}
                {cat.rows.map((row, rowIdx) => {
                  const isEven = rowIdx % 2 === 0;
                  return (
                    <tr
                      key={`row-${catIdx}-${rowIdx}`}
                      className={`comparison-row border-b border-[#E7EBE8] last:border-0 ${isEven ? 'bg-white' : 'bg-[#FAFCFB]'}`}
                    >
                      {/* Feature label + desc */}
                      <td
                        className={`sticky left-0 z-10 py-5 px-6 border-r border-[#E7EBE8] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.07)] ${isEven ? 'bg-white' : 'bg-[#FAFCFB]'}`}
                      >
                        <p className="font-semibold text-[#0B0F0D] text-sm leading-tight">{row.label}</p>
                        <p className="feature-row-desc">{row.desc}</p>
                      </td>

                      {/* Starter */}
                      <td className="py-5 px-4 text-center align-middle">
                        <div className="flex flex-col items-center gap-1.5">
                          {statusIcon(row.starter.status, false)}
                          <span className={`text-[11px] leading-snug ${row.starter.status === 'no' ? 'text-[#CBD5C0]' : row.starter.status === 'partial' ? 'text-[#57615B]' : 'text-[#3F4742] font-medium'}`}>
                            {row.starter.text}
                          </span>
                        </div>
                      </td>

                      {/* Pro — glowing column */}
                      <td className={`py-5 px-4 text-center align-middle pro-column-td ${isEven ? 'bg-[#EAF8EF]/40' : 'bg-[#EAF8EF]/25'}`}>
                        <div className="flex flex-col items-center gap-1.5">
                          {statusIcon(row.pro.status, true)}
                          <span className={`text-[11px] leading-snug font-medium ${row.pro.status === 'no' ? 'text-[#A8C0B0]' : 'text-[#064E2B]'}`}>
                            {row.pro.text}
                          </span>
                        </div>
                      </td>

                      {/* Enterprise */}
                      <td className="py-5 px-4 text-center align-middle">
                        <div className="flex flex-col items-center gap-1.5">
                          {statusIcon(row.enterprise.status, false)}
                          <span className={`text-[11px] leading-snug ${row.enterprise.status === 'no' ? 'text-[#CBD5C0]' : row.enterprise.status === 'partial' ? 'text-[#57615B]' : 'text-[#3F4742] font-medium'}`}>
                            {row.enterprise.text}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>

          {/* ── FOOTER CTA ── */}
          <tfoot>
            <tr className="bg-[#F7F9F8] border-t-2 border-[#E7EBE8]">
              <td className="sticky left-0 z-10 py-5 px-6 bg-[#F7F9F8] border-r border-[#E7EBE8] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.07)]">
                <span className="text-xs font-bold text-[#57615B] uppercase tracking-wider">เริ่มต้นใช้งาน</span>
              </td>
              <td className="py-5 px-4 text-center">
                <Link to="/contact" className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold border-2 border-[#064E2B] text-[#064E2B] rounded-xl hover:bg-[#064E2B] hover:text-white transition-all duration-300">
                  {t('pricing.cta', 'เลือกแผนนี้')}
                </Link>
              </td>
              <td className="py-5 px-4 text-center pro-column-td bg-[#064E2B]/05">
                <Link to="/contact" className="inline-flex items-center justify-center px-5 py-2 text-xs font-extrabold bg-[#064E2B] text-white rounded-xl hover:bg-[#042218] transition-all duration-300 shadow-[0_4px_14px_rgba(6,78,43,0.3)]">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  {t('pricing.cta', 'เลือกแผนนี้')}
                </Link>
              </td>
              <td className="py-5 px-4 text-center">
                <Link to="/contact" className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold bg-[#0B0F0D] text-white rounded-xl hover:bg-[#064E2B] transition-all duration-300">
                  {t('pricing.cta', 'เลือกแผนนี้')}
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-[#57615B]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#19B965]" /> รวมในแพ็กเกจ
        </span>
        <span className="flex items-center gap-1.5">
          <MinusCircle className="w-4 h-4 text-[#A8B0AA]" /> บางกรณี / จำกัด
        </span>
        <span className="flex items-center gap-1.5">
          <XCircle className="w-4 h-4 text-[#CBD5C0]" /> ไม่รวมในแพ็กเกจ
        </span>
      </motion.div>
    </div>
  );
}

export default function PricingPage() {
  const { t, i18n } = useTranslation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    document.title = `${t('nav.pricing', 'แพ็กเกจ')} | ${COMPANY_INFO.nameEn}`;
    
    apiService.getPackages().then((res) => {
      if (res.success && res.data && res.data.length > 0) {
        setPackages(res.data);
      } else {
        setPackages(getFallbackPackages());
      }
    }).catch(() => {
      setPackages(getFallbackPackages());
    });
  }, [t]);

  function getFallbackPackages(): Package[] {
    return [
      {
        id: 'starter',
        name: t('pricing.packages.starter.name', 'Starter'),
        price: 990,
        currency: t('pricing.currency', 'THB'),
        period: t('pricing.period', 'Month'),
        description: t('pricing.starterDesc'),
        badge: null,
        highlighted: false,
        features: [
          { text: t('pricing.features.basicQA'), included: true },
          { text: t('pricing.features.basicDoc'), included: true },
          { text: t('pricing.features.updateInfo'), included: true },
          { text: t('pricing.features.smallBiz'), included: true },
          { text: t('pricing.features.advDoc'), included: false },
          { text: t('pricing.features.advConsult'), included: false },
          { text: t('pricing.features.custom'), included: false },
          { text: t('pricing.features.manager'), included: false },
          { text: t('pricing.features.report'), included: false },
          { text: t('pricing.features.multiDept'), included: false },
        ],
        cta: t('pricing.cta', 'Choose Plan'),
      },
      {
        id: 'professional',
        name: t('pricing.packages.pro.name', 'Professional'),
        price: 2990,
        currency: t('pricing.currency', 'THB'),
        period: t('pricing.period', 'Month'),
        description: t('pricing.proDesc'),
        badge: t('pricing.badgePopular', 'Popular'),
        highlighted: true,
        features: [
          { text: t('pricing.features.basicQA'), included: true },
          { text: t('pricing.features.basicDoc'), included: true },
          { text: t('pricing.features.updateInfo'), included: true },
          { text: t('pricing.features.allStarter'), included: true },
          { text: t('pricing.features.advDoc'), included: true },
          { text: t('pricing.features.advConsult'), included: true },
          { text: t('pricing.features.custom'), included: false },
          { text: t('pricing.features.manager'), included: false },
          { text: t('pricing.features.report'), included: true },
          { text: t('pricing.features.multiDept'), included: false },
        ],
        cta: t('pricing.cta', 'Choose Plan'),
      },
      {
        id: 'enterprise',
        name: t('pricing.packages.enterprise.name', 'Enterprise'),
        price: 6990,
        currency: t('pricing.currency', 'THB'),
        period: t('pricing.period', 'Month'),
        description: t('pricing.enterpriseDesc'),
        badge: null,
        highlighted: false,
        features: [
          { text: t('pricing.features.basicQA'), included: true },
          { text: t('pricing.features.basicDoc'), included: true },
          { text: t('pricing.features.updateInfo'), included: true },
          { text: t('pricing.features.allPro'), included: true },
          { text: t('pricing.features.advDoc'), included: true },
          { text: t('pricing.features.advConsult'), included: true },
          { text: t('pricing.features.custom'), included: true },
          { text: t('pricing.features.manager'), included: true },
          { text: t('pricing.features.report'), included: true },
          { text: t('pricing.features.multiDept'), included: true },
        ],
        cta: t('pricing.cta', 'Choose Plan'),
      },
    ];
  }

  // Dynamic FAQs from translation
  const translatedFaqs = t('pricing.faqs', { returnObjects: true }) as Array<{ q: string; a: string }>;
  const mappedFaqs: Faq[] = translatedFaqs.map((faq, index) => ({
    id: index + 1,
    category: 'general',
    question: faq.q,
    answer: faq.a
  }));

  const calculatePrice = (basePrice: number) => {
    if (isYearly) {
      return Math.floor(basePrice * 12 * 0.85);
    }
    return basePrice;
  };

  // Package IDs in order
  const pkgKeys = ['starter', 'pro', 'enterprise'] as const;

  // Per-package config
  const packageConfig = [
    {
      wrapperClass: 'bg-white border border-[#E7EBE8] hover:border-[#19B965] hover:shadow-[0_8px_30px_rgba(25,185,101,0.12)] hover:-translate-y-2 transition-all duration-300 pricing-card-hover rounded-[24px]',
      isDark: false,
      isHighlighted: false,
      textAccent: 'text-[#0E8F4D]',
      priceColor: 'text-[#0E8F4D]',
      badgeClass: 'bg-[#EAF8EF] text-[#064E2B] border border-[#9EE6BC]',
      highlightBoxBg: 'bg-[#F3F6F4]',
      highlightBoxBorder: 'border-[#E7EBE8]',
      highlightBoxText: 'text-[#3F4742]',
      highlightBoxIcon: 'text-[#0E8F4D]',
      ctaClass: 'w-full text-center py-4 rounded-xl font-bold transition-all duration-300 border-2 border-[#064E2B] text-[#064E2B] hover:bg-[#064E2B] hover:text-white',
      nameColor: 'text-[#0B0F0D]',
      positioningColor: 'text-[#0E8F4D]',
      summaryColor: 'text-[#3F4742]',
      dividerColor: 'border-[#E7EBE8]',
      suitableIconBg: 'bg-[#EAF8EF]',
      suitableIconColor: 'text-[#0E8F4D]',
      suitableText: 'text-[#3F4742]',
      notIncludedText: 'text-[#7E8A82]',
      Icon: Users,
    },
    {
      wrapperClass: 'bg-[#064E2B] border border-[#19B965]/50 rounded-[24px] shadow-[0_8px_40px_rgba(6,78,43,0.35)] scale-[1.025] hover:scale-[1.025] hover:-translate-y-2 transition-all duration-300 z-10 relative animated-border',
      isDark: true,
      isHighlighted: true,
      textAccent: 'text-[#9EE6BC]',
      priceColor: 'text-[#9EE6BC]',
      badgeClass: 'bg-[#19B965] text-white border border-[#9EE6BC]',
      highlightBoxBg: 'bg-[#042218]',
      highlightBoxBorder: 'border-[#19B965]/30',
      highlightBoxText: 'text-[#B7E8C9]',
      highlightBoxIcon: 'text-[#9EE6BC]',
      ctaClass: 'w-full text-center py-4 rounded-xl font-bold transition-all duration-300 bg-white text-[#064E2B] hover:bg-[#9EE6BC] hover:text-[#064E2B]',
      nameColor: 'text-white',
      positioningColor: 'text-[#9EE6BC]',
      summaryColor: 'text-white/85',
      dividerColor: 'border-[#19B965]/30',
      suitableIconBg: 'bg-[#19B965]/20',
      suitableIconColor: 'text-[#9EE6BC]',
      suitableText: 'text-white/80',
      notIncludedText: 'text-white/55',
      Icon: Star,
    },
    {
      wrapperClass: 'bg-[#0B1711] border border-[#3F4742] hover:border-[#747D77] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 pricing-card-hover rounded-[24px]',
      isDark: true,
      isHighlighted: false,
      textAccent: 'text-[#9EE6BC]',
      priceColor: 'text-[#19B965]',
      badgeClass: 'bg-[#19B965]/20 text-[#9EE6BC] border border-[#19B965]/40',
      highlightBoxBg: 'bg-[#0B0F0D]',
      highlightBoxBorder: 'border-[#3F4742]',
      highlightBoxText: 'text-white/85',
      highlightBoxIcon: 'text-[#9EE6BC]',
      ctaClass: 'w-full text-center py-4 rounded-xl font-bold transition-all duration-300 bg-[#19B965] text-[#0B0F0D] hover:bg-white hover:text-[#0B0F0D]',
      nameColor: 'text-white',
      positioningColor: 'text-[#9EE6BC]',
      summaryColor: 'text-white/80',
      dividerColor: 'border-[#3F4742]',
      suitableIconBg: 'bg-[#19B965]/10',
      suitableIconColor: 'text-[#19B965]',
      suitableText: 'text-white/85',
      notIncludedText: 'text-white/25',
      Icon: Building2,
    },
  ];

  // Feature groups per package
  function getFeatureGroups(pkgKey: 'starter' | 'pro' | 'enterprise') {
    const details = t(`pricing.featureDetails.${pkgKey}`, { returnObjects: true }) as Record<string, string[]>;
    const groups = t('pricing.featureGroups', { returnObjects: true }) as Record<string, string>;
    const tooltips = t('pricing.tooltips', { returnObjects: true }) as Record<string, string>;
    
    const groupKeys = ['contact', 'tracking', 'consultation', 'planning', 'reports', 'manager'];
    const notIncluded = ['ไม่รวม', 'Not included', 'Not included'];
    
    return groupKeys.map(gk => ({
      label: groups[gk] || gk,
      items: (details[gk] || []).map(text => ({
        text,
        included: !notIncluded.some(ni => text === ni),
        tooltip: gk === 'contact' ? tooltips['responseTime']
          : gk === 'manager' ? tooltips['manager']
          : gk === 'reports' ? tooltips['reports']
          : gk === 'consultation' ? tooltips['consultation']
          : undefined,
      }))
    }));
  }

  function getSuitableFor(pkgKey: 'starter' | 'pro' | 'enterprise') {
    return t(`pricing.suitableFor.${pkgKey}`, { returnObjects: true }) as string[];
  }
  function getNotIncluded(pkgKey: 'starter' | 'pro' | 'enterprise') {
    return t(`pricing.notIncluded.${pkgKey}`, { returnObjects: true }) as string[];
  }

  return (
    <div className="pt-[76px] lg:pt-[80px] bg-[#FAFCFB]">
      
      {/* Decorative orbs */}
      <div className="fixed pointer-events-none top-0 right-0 w-96 h-96 bg-[#EAF8EF] rounded-full blur-[120px] opacity-30 z-0" aria-hidden="true" />
      <div className="fixed pointer-events-none bottom-0 left-0 w-64 h-64 bg-[#F3F6F4] rounded-full blur-[80px] opacity-40 z-0" aria-hidden="true" />

      {/* Hero */}
      <section className="relative bg-[#FAFCFB] py-20 lg:py-24 overflow-hidden section-top-glow" aria-label="Pricing">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.4]" aria-hidden="true" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em] bg-[#EAF8EF] px-4 py-1.5 rounded-full">
                MEMBERSHIP PLANS
              </span>
              <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#0B0F0D] leading-[1.1] mb-6">
              {t('pricing.heroLine1', 'สมัครง่าย')} <span className="text-[#0E8F4D]">{t('pricing.heroLine2', 'ดูแลครบ')}</span>
            </h1>
            <p className="text-[#3F4742] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
              {t('pricing.heroDesc')}
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              {[t('pricing.ctaSection.trust.0', 'ไม่มีค่าธรรมเนียมประเมิน'), t('pricing.ctaSection.trust.1', 'เปลี่ยนแพ็กเกจได้'), t('pricing.ctaSection.trust.2', 'แจ้งเงื่อนไขชัดเจน')].map((txt, i) => (
                <span key={i} className="flex items-center gap-2 text-sm text-[#3F4742]">
                  <ShieldCheck className="w-4 h-4 text-[#0E8F4D] flex-shrink-0" aria-hidden="true" />
                  {txt}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Toggle & Cards */}
      <section className="py-20 lg:py-24 bg-[#FAFCFB] relative" aria-labelledby="pricing-heading">
        <div className="container-custom">
          
          <div className="text-center mb-8">
            <h2 id="pricing-heading" className="text-2xl font-bold text-[#0B0F0D] mb-8">{t('pricing.whichPackage')}</h2>
            {/* Segmented Control Toggle */}
            <div
              className="inline-flex items-center p-1.5 bg-[#F3F6F4] rounded-[16px] mx-auto relative border border-[#E7EBE8]"
              role="group"
              aria-label="Billing period"
            >
              <div
                className="absolute inset-y-1.5 w-[calc(50%-6px)] bg-white rounded-[10px] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#E7EBE8]"
                style={{ left: isYearly ? 'calc(50% + 3px)' : '3px' }}
              />
              
              <button
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-[10px] transition-colors duration-300 w-32 ${!isYearly ? 'text-[#0B0F0D]' : 'text-[#57615B]'}`}
                onClick={() => setIsYearly(false)}
                aria-pressed={!isYearly}
              >
                {t('pricing.monthly', 'รายเดือน')}
              </button>
              <button
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-[10px] transition-colors duration-300 w-32 flex items-center justify-center gap-2 ${isYearly ? 'text-[#0B0F0D]' : 'text-[#57615B]'}`}
                onClick={() => setIsYearly(true)}
                aria-pressed={isYearly}
              >
                {t('pricing.yearly', 'รายปี')}
                <span className="absolute -top-3 -right-2 bg-[#19B965] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  -15%
                </span>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 items-start max-w-7xl mx-auto mt-12">
            <AnimatePresence mode="wait">
              {packages.map((pkg, i) => {
                const cfg = packageConfig[i % packageConfig.length];
                const pkgKey = pkgKeys[i % pkgKeys.length];
                const featureGroups = getFeatureGroups(pkgKey);
                const suitableFor = getSuitableFor(pkgKey);
                const notIncluded = getNotIncluded(pkgKey);
                
                return (
                  <motion.div
                    key={pkg.id}
                    className={`relative p-7 lg:p-8 flex flex-col ${cfg.wrapperClass}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Badge */}
                    {(pkg.badge || i === 0 || i === 2) && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className={`text-xs font-extrabold px-4 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap uppercase tracking-widest ${cfg.badgeClass}`}>
                          {i === 1 && <Sparkles className="w-3.5 h-3.5" />}
                          {i === 0 ? t('pricing.badge.starter', 'เหมาะสำหรับเริ่มต้น')
                            : i === 1 ? (pkg.badge || t('pricing.badge.pro', 'ยอดนิยม'))
                            : t('pricing.badge.enterprise', 'ครบที่สุด')}
                        </div>
                      </div>
                    )}

                    {/* Package header */}
                    <div className="mb-5">
                      <div className={`inline-flex items-center gap-2 mb-2`}>
                        <cfg.Icon className={`w-5 h-5 ${cfg.textAccent}`} aria-hidden="true" />
                        <h3 className={`text-xl font-extrabold ${cfg.nameColor}`}>{pkg.name}</h3>
                      </div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${cfg.positioningColor}`}>
                        {t(`pricing.positioning.${pkgKey}`, pkg.description)}
                      </p>
                      <p className={`text-sm leading-relaxed ${cfg.summaryColor}`}>
                        {t(`pricing.summary.${pkgKey}`, pkg.description)}
                      </p>
                    </div>

                    {/* Highlight box */}
                    <div className={`rounded-xl p-3 mb-5 border flex items-start gap-2.5 ${cfg.highlightBoxBg} ${cfg.highlightBoxBorder}`}>
                      <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${cfg.highlightBoxIcon}`} aria-hidden="true" />
                      <p className={`text-xs leading-relaxed font-medium ${cfg.highlightBoxText}`}>
                        <span className="font-bold">จุดเด่น: </span>
                        {t(`pricing.highlight.${pkgKey}`, '')}
                      </p>
                    </div>

                    {/* Price */}
                    <div className={`mb-6 pb-6 border-b ${cfg.dividerColor}`}>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl lg:text-5xl font-extrabold tracking-tight ${cfg.priceColor}`}>
                          <motion.span
                            key={isYearly ? 'yearly' : 'monthly'}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block"
                          >
                            {calculatePrice(pkg.price).toLocaleString(i18n.language === 'en' ? 'en-US' : 'th-TH')}
                          </motion.span>
                        </span>
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold ${cfg.isDark ? 'text-white' : 'text-[#0B0F0D]'}`}>
                            {pkg.currency}
                          </span>
                          <span className={`text-xs ${cfg.isDark ? 'text-white/50' : 'text-[#57615B]'}`}>
                            / {isYearly ? t('pricing.perYear', 'ปี') : pkg.period}
                          </span>
                        </div>
                      </div>
                      {isYearly && (
                        <p className={`text-xs mt-2 ${cfg.isDark ? 'text-[#9EE6BC]' : 'text-[#0E8F4D]'}`}>
                          ≈ {Math.floor(calculatePrice(pkg.price) / 12).toLocaleString()} {pkg.currency}/{pkg.period}
                        </p>
                      )}
                    </div>

                    {/* Feature groups */}
                    <div className="flex-1 mb-6 space-y-1">
                      {featureGroups.map((group, gi) => (
                        <FeatureGroup
                          key={gi}
                          label={group.label}
                          items={group.items}
                          isDark={cfg.isDark}
                          isHighlighted={cfg.isHighlighted}
                        />
                      ))}
                    </div>



                    {/* CTA */}
                    <a
                      href="/contact"
                      className={`block text-center py-4 rounded-xl font-bold transition-all duration-300 tracking-wide text-sm mt-auto ${cfg.ctaClass}`}
                    >
                      {pkg.cta}
                    </a>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Comparison strip */}
          <ComparisonStrip t={t} />

          {/* Suitable For & Not Included Section */}
          <div className="mt-16 mb-4">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold text-[#0E8F4D] uppercase tracking-[0.2em] mb-3 bg-[#EAF8EF] px-5 py-2 rounded-full">
                {t('pricing.businessTypes.subtitle', 'แพ็กเกจที่เหมาะกับธุรกิจของคุณ')}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0B0F0D] mt-3">
                {t('pricing.businessTypes.title', 'เลือกจากรูปแบบการทำงานของธุรกิจคุณ')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(['starter', 'pro', 'enterprise'] as const).map((key, i) => {
                const btConfig = [
                  { accent: '#0E8F4D', bg: 'bg-white', border: 'border-[#E7EBE8]', headingColor: 'text-[#064E2B]', icon: Users },
                  { accent: '#064E2B', bg: 'bg-[#064E2B]', border: 'border-[#19B965]/40', headingColor: 'text-white', icon: Star },
                  { accent: '#0B0F0D', bg: 'bg-[#0B1711]', border: 'border-[#3F4742]', headingColor: 'text-[#19B965]', icon: Building2 },
                ];
                const cfg = btConfig[i];
                const suitableFor = getSuitableFor(key);
                const notIncluded = getNotIncluded(key);
                return (
                  <div key={key} className={`${cfg.bg} border ${cfg.border} rounded-[20px] p-6 lg:p-7 shadow-sm`}>
                    <h4 className={`font-extrabold text-lg mb-4 ${cfg.headingColor}`}>
                      {i === 0 ? t('pricing.packages.starter.name') : i === 1 ? t('pricing.packages.pro.name') : t('pricing.packages.enterprise.name')}
                    </h4>
                    
                    <div className="mb-6">
                      <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-[#57615B]' : 'text-white/50'}`}>
                        {i === 0 ? 'Suitable For' : 'เหมาะกับ'}
                      </p>
                      <ul className="space-y-2">
                        {suitableFor.map((item, si) => (
                          <li key={si} className={`flex items-start gap-2 text-sm ${i === 0 ? 'text-[#3F4742]' : 'text-white/80'}`}>
                            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${i === 0 ? 'text-[#0E8F4D]' : 'text-[#9EE6BC]'}`} aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-[#7E8A82]' : 'text-white/55'}`}>
                        {i === 0 ? 'Not Included' : 'ไม่รวมในแพ็กเกจ'}
                      </p>
                      <ul className="space-y-2">
                        {notIncluded.map((item, ni) => (
                          <li key={ni} className={`flex items-start gap-2 text-sm ${i === 0 ? 'text-[#7E8A82]' : 'text-white/60'}`}>
                            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-60" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          {/* Enhanced CTA Section below */}
          <div className="mt-10 relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-[#F3FBF5] to-[#EAF8EF] border border-[#D0EDDB] shadow-[0_4px_30px_rgba(25,185,101,0.08)] p-8 lg:p-12">
            {/* Background dots */}
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />
            {/* Glow */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-[#19B965] rounded-full blur-[60px] opacity-10" aria-hidden="true" />

            <div className="relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
                <span className="text-[11px] font-extrabold text-[#0E8F4D] uppercase tracking-[0.2em]">
                  {t('pricing.ctaSection.eyebrow', 'ขอคำแนะนำฟรี')}
                </span>
                <span className="w-8 h-[1px] bg-[#19B965]" aria-hidden="true" />
              </div>

              {/* Heading */}
              <h3 className="text-xl md:text-3xl font-extrabold text-[#0B0F0D] mb-4 text-center leading-tight">
                {t('pricing.ctaSection.title', 'ยังไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับธุรกิจของคุณ?')}
              </h3>

              {/* Description */}
              <p className="text-[#3F4742] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 text-center">
                {t('pricing.ctaSection.desc', 'ทีมงานสามารถช่วยประเมินจากจำนวนงาน ความถี่ในการติดตาม จำนวนผู้ประสานงาน และระดับความซับซ้อนของธุรกิจ เพื่อแนะนำแพ็กเกจที่เหมาะสมโดยไม่บังคับขาย')}
              </p>

              {/* Trust items */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8">
                {(t('pricing.ctaSection.trust', { returnObjects: true }) as string[]).map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-[#3F4742] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#0E8F4D] flex-shrink-0" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#064E2B] text-white font-bold rounded-xl hover:bg-[#0B0F0D] transition-all duration-300 shadow-[0_4px_20px_rgba(6,78,43,0.3)] hover:-translate-y-0.5 text-sm overflow-hidden group/cta1"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/cta1:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">{t('pricing.ctaSection.btn1', 'ขอคำแนะนำแพ็กเกจ')}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/cta1:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#064E2B] text-[#064E2B] font-bold rounded-xl hover:bg-[#EAF8EF] transition-all duration-300 text-sm"
                >
                  {t('pricing.ctaSection.btn2', 'ติดต่อทีมงาน')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-white section-top-glow" aria-labelledby="pricing-faq-heading">
        <div className="container-custom max-w-3xl">
          <SectionDivider title={t('pricing.faqTitle')} subtitle="FAQ" variant="B" />
          <div className="mt-12">
            <Accordion items={mappedFaqs} columns={1} />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
