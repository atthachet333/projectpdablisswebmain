import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  id: number;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  columns?: 1 | 2;
}

function AccordionItemComponent({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${
      open ? 'border-primary-300 shadow-card' : 'border-gray-200'
    }`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
        aria-expanded={open}
        id={`faq-btn-${item.id}`}
        aria-controls={`faq-panel-${item.id}`}
      >
        <span className="font-semibold text-dark-900 text-sm leading-relaxed">{item.question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? 'text-primary-700' : 'text-gray-400'}`} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-btn-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, columns = 2 }: AccordionProps) {
  if (columns === 2) {
    const half = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, half);
    const rightItems = items.slice(half);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          {leftItems.map((item) => (
            <AccordionItemComponent key={item.id} item={item} />
          ))}
        </div>
        <div className="space-y-3">
          {rightItems.map((item) => (
            <AccordionItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AccordionItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
