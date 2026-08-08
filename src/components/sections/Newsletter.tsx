'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeUp from '@/components/animations/FadeUp';
import { contactInfo, destinations } from '@/lib/data';
import { useCmsData } from '@/lib/sheetCms';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const cms = useCmsData({ destinations });
  const contact = { ...contactInfo, ...cms.contactInfo };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: 'New newsletter subscriber - Ready Go Trips',
          _template: 'table',
          _captcha: 'false',
          subscriber_email: email,
          source: 'Ready Go Trips website newsletter',
        }),
      });

      if (!response.ok) throw new Error('Newsletter service unavailable');
      setSubmitted(true);
      setEmail('');
    } catch {
      const subject = encodeURIComponent('New newsletter subscriber - Ready Go Trips');
      const body = encodeURIComponent(`New newsletter subscriber:\n\nEmail: ${email}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-10 md:py-16 max-w-4xl mx-auto px-4 md:px-6">
      <FadeUp>
        <div className="relative rounded-3xl overflow-hidden bg-secondary p-[1px] shadow-2xl shadow-blue-950/10">
          <div className="bg-white backdrop-blur-xl rounded-[23px] p-6 md:p-10 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="font-heading text-2xl md:text-4xl font-bold mb-3">
                Ready For Your Next <br /> 
                <span className="text-secondary">Adventure?</span>
              </h2>
              <p className="text-sm md:text-base text-muted mb-6 max-w-lg mx-auto">
                Subscribe for exclusive deals, travel tips, and early access to new trips.
              </p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-3 rounded-full border border-secondary/15 bg-blue-50 text-secondary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                  />
                  <button 
                    type="submit"
                    disabled={sending}
                    className="px-7 py-3 bg-gradient-accent rounded-full font-semibold text-white hover:opacity-90 transition whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? 'Sending...' : 'Subscribe'} <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-6 py-4 glass rounded-full text-accent"
                >
                  <Send className="w-5 h-5" />
                  <span>Thank you! We&apos;ll be in touch.</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

