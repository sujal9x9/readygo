'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Mail, MapPin, Phone, Send, User } from 'lucide-react';
import { contactInfo, destinations } from '@/lib/data';
import { useCmsData } from '@/lib/sheetCms';

type BookingFormState = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  travelers: string;
  pickupCity: string;
  notes: string;
};

const initialState: BookingFormState = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDate: '',
  travelers: '2',
  pickupCity: '',
  notes: '',
};

export default function BookingForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const cms = useCmsData({ destinations });
  const packageData = cms.packages.length ? cms.packages : destinations;
  const contact = { ...contactInfo, ...cms.contactInfo };

  const emailBody = useMemo(
    () =>
      [
        'New booking enquiry from Ready Go Trips website',
        '',
        `Customer Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Destination / Package: ${form.destination}`,
        `Preferred Travel Date: ${form.travelDate || 'Not specified'}`,
        `Number of Travelers: ${form.travelers}`,
        `Pickup City: ${form.pickupCity || 'Not specified'}`,
        '',
        'Extra Details:',
        form.notes || 'No extra details provided.',
      ].join('\n'),
    [form]
  );

  const updateField = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openMailFallback = () => {
    const subject = encodeURIComponent(`Booking enquiry - ${form.destination || 'Ready Go Trips'}`);
    const body = encodeURIComponent(emailBody);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const payload = {
      _subject: `Booking enquiry - ${form.destination || 'Ready Go Trips'}`,
      _template: 'table',
      _captcha: 'false',
      customer_name: form.name,
      email: form.email,
      phone: form.phone,
      destination: form.destination,
      travel_date: form.travelDate,
      travelers: form.travelers,
      pickup_city: form.pickupCity,
      notes: form.notes,
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Booking email service unavailable');
      }

      setStatus('sent');
      setForm(initialState);
    } catch {
      setStatus('fallback');
      openMailFallback();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[24px] md:rounded-[28px] border border-secondary/12 bg-white p-4 md:p-8 shadow-xl md:shadow-2xl shadow-blue-950/10">
      <div className="grid gap-4 md:gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <User className="h-4 w-4" />
            Customer Name
          </span>
          <input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
            placeholder="Enter full name"
          />
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <Mail className="h-4 w-4" />
            Email Address
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
            placeholder="name@example.com"
          />
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <Phone className="h-4 w-4" />
            Phone Number
          </span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="w-full rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
            placeholder="+91 98765 43210"
          />
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <MapPin className="h-4 w-4" />
            Destination / Package
          </span>
          <select
            required
            value={form.destination}
            onChange={(event) => updateField('destination', event.target.value)}
            className="w-full rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
          >
            <option value="">Select a package</option>
            {packageData.map((destination) => (
              <option key={destination.id} value={destination.name}>
                {destination.name} - {destination.duration}
              </option>
            ))}
            <option value="Custom Trip">Custom Trip</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <CalendarDays className="h-4 w-4" />
            Preferred Date
          </span>
          <input
            type="date"
            value={form.travelDate}
            onChange={(event) => updateField('travelDate', event.target.value)}
            className="w-full rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-secondary">Number of Travelers</span>
          <input
            required
            min="1"
            type="number"
            value={form.travelers}
            onChange={(event) => updateField('travelers', event.target.value)}
            className="w-full rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-secondary">Pickup City</span>
          <input
            value={form.pickupCity}
            onChange={(event) => updateField('pickupCity', event.target.value)}
            className="w-full rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
            placeholder="Delhi, Dehradun, Chandigarh..."
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-secondary">Extra Details</span>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            className="w-full resize-none rounded-2xl border border-secondary/15 bg-blue-50 px-4 py-2.5 md:py-3 text-secondary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
            placeholder="Budget, preferred hotel type, special occasion, questions..."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 md:mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-accent px-6 py-3.5 md:py-4 font-bold text-white shadow-xl shadow-red-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send className="h-5 w-5" />
        {status === 'sending' ? 'Sending...' : 'Book Now'}
      </button>

      {status === 'sent' && (
        <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Booking details sent. The team will contact the customer soon.
        </p>
      )}

      {status === 'fallback' && (
        <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-secondary">
          Email app opened with the booking details. Send that email to complete the enquiry.
        </p>
      )}
    </form>
  );
}
