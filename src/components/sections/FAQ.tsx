'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { destinations, faqs } from '@/lib/data';
import { useCmsData } from '@/lib/sheetCms';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeUp from '@/components/animations/FadeUp';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cms = useCmsData({ destinations, faqs });
  const faqData = cms.faqs.length ? cms.faqs : faqs;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-16 max-w-3xl mx-auto px-4 md:px-6">
      <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know before your trip" />
      
      <div className="mt-8 md:mt-10">
        {faqData.slice(0, 5).map((faq, index) => (
          <FadeUp key={faq.id} delay={index * 0.05}>
            <div className="mb-3">
              <button 
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-4 md:p-5 glass-card rounded-2xl text-secondary hover:bg-blue-50 transition-colors"
              >
                <span className="font-heading text-left text-sm md:text-base font-medium">{faq.question}</span>
                <ChevronDown 
                  className="w-5 h-5 text-muted transition-transform duration-300 flex-shrink-0" 
                  style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3, ease: 'easeInOut' }} 
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-5 pb-5 pt-1 text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

