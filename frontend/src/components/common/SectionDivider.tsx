import { motion } from 'framer-motion';

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  number?: string;
  variant?: 'A' | 'B' | 'C' | 'D' | 'E';
  center?: boolean; // Kept for backward compatibility, but variant overrides alignment in some cases
}

export default function SectionDivider({ 
  title, 
  subtitle, 
  eyebrow,
  number,
  variant = 'E', // Default to E (centered) for legacy compatibility
  center = true
}: SectionDividerProps) {
  
  // Variant A: Left aligned, Eyebrow Green, Heading Black, Left Green Line
  if (variant === 'A') {
    return (
      <div className="mb-12 md:mb-16 relative pl-6">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0E8F4D] rounded-full" aria-hidden="true" />
        {eyebrow && (
          <motion.p 
            className="text-sm font-bold text-[#0E8F4D] uppercase tracking-[0.15em] mb-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-[#0B0F0D] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="text-base md:text-lg text-[#3F4742] max-w-2xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  // Variant B: Large Light Gray Number behind Heading
  if (variant === 'B') {
    return (
      <div className="mb-12 md:mb-16 relative">
        {number && (
          <div className="absolute -top-10 -left-6 text-8xl md:text-[140px] font-extrabold text-[#F3F6F4] select-none pointer-events-none z-0" aria-hidden="true">
            {number}
          </div>
        )}
        <div className="relative z-10 pt-4">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-[#0B0F0D] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-base md:text-lg text-[#3F4742] max-w-2xl"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  // Variant C: White Heading, short light border below (for dark sections)
  if (variant === 'C') {
    return (
      <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
        {eyebrow && (
          <motion.p 
            className="text-sm font-bold text-[#19B965] uppercase tracking-wider mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <div className={`flex items-center gap-2 mb-6 ${center ? 'justify-center' : ''}`} aria-hidden="true">
          <motion.div 
            className="h-1 w-12 bg-[#0E8F4D] rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        {subtitle && (
          <motion.p
            className={`text-base md:text-lg text-white/85 max-w-2xl ${center ? 'mx-auto' : ''}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  // Variant D: Heading + Moving Dash, left aligned
  if (variant === 'D') {
    return (
      <div className="mb-12 md:mb-16">
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-[2px] bg-[#0E8F4D] relative overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[#9EE6BC] translate-x-[-100%] animate-[shine_2s_infinite]" />
          </div>
          {eyebrow && (
            <span className="text-sm font-bold text-[#0E8F4D] uppercase tracking-wider">
              {eyebrow}
            </span>
          )}
        </motion.div>
        
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-[#0B0F0D] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="text-base md:text-lg text-[#3F4742] max-w-2xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  // Variant E: Center Heading with subtle dot grid behind (Legacy default replacement)
  return (
    <div className={`mb-12 md:mb-16 relative ${center ? 'text-center' : ''}`}>
      <div className={`absolute -top-6 ${center ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-32 h-16 opacity-30 pointer-events-none z-0`} aria-hidden="true" style={{ backgroundImage: 'radial-gradient(#0E8F4D 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
      
      <div className="relative z-10">
        {eyebrow && (
          <motion.p 
            className="text-sm font-bold text-[#0E8F4D] uppercase tracking-wider mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-[#0B0F0D] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className={`text-base md:text-lg text-[#3F4742] max-w-2xl ${center ? 'mx-auto' : ''}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
