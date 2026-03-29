'use client';

import { useState, useRef, type FormEvent } from 'react';
import type { Locale } from '@/lib/i18n/utils';
import { t } from '@/lib/i18n/utils';

interface BookingFormProps {
  formId?: string;
  locale?: Locale;
}

export default function BookingForm({ formId = 'booking-form', locale = 'nb' }: BookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');

    try {
      const res = await fetch('/api/bestilling', {
        method: 'POST',
        body: new FormData(formRef.current),
      });

      if (res.ok) {
        setStatus('success');
        formRef.current.reset();
      } else {
        throw new Error('Error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="booking-form" id={formId} method="POST" action="/api/bestilling" ref={formRef} onSubmit={handleSubmit}>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>{t('form.honeypot', locale)}</label>
        <input type="text" id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`${formId}-navn`}>{t('form.name', locale)} <span className="required">{t('form.required', locale)}</span></label>
          <input type="text" id={`${formId}-navn`} name="navn" required autoComplete="name" placeholder={locale === 'en' ? 'Your full name' : 'Ditt fulle navn'} />
        </div>
        <div className="form-group">
          <label htmlFor={`${formId}-epost`}>{t('form.email', locale)} <span className="required">{t('form.required', locale)}</span></label>
          <input type="email" id={`${formId}-epost`} name="epost" required autoComplete="email" placeholder={locale === 'en' ? 'your@email.com' : 'din@epost.no'} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`${formId}-telefon`}>{t('form.phone', locale)}</label>
          <input type="tel" id={`${formId}-telefon`} name="telefon" autoComplete="tel" placeholder={t('form.phonePlaceholder', locale)} />
        </div>
        <div className="form-group">
          <label htmlFor={`${formId}-type`}>{t('form.type', locale)} <span className="required">{t('form.required', locale)}</span></label>
          <select id={`${formId}-type`} name="type" required defaultValue="">
            <option value="" disabled>{t('form.typeSelect', locale)}</option>
            <option value="servering">{t('form.typeServering', locale)}</option>
            <option value="selskap">{t('form.typeSelskap', locale)}</option>
            <option value="omvisning">{t('form.typeOmvisning', locale)}</option>
            <option value="annet">{t('form.typeAnnet', locale)}</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`${formId}-dato`}>{t('form.date', locale)}</label>
          <input type="date" id={`${formId}-dato`} name="dato" />
        </div>
        <div className="form-group">
          <label htmlFor={`${formId}-antall`}>{t('form.guests', locale)}</label>
          <input type="number" id={`${formId}-antall`} name="antall" min={1} max={200} placeholder={t('form.guestsPlaceholder', locale)} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor={`${formId}-melding`}>{t('form.message', locale)} <span className="required">{t('form.required', locale)}</span></label>
        <textarea id={`${formId}-melding`} name="melding" rows={5} required placeholder={t('form.messagePlaceholder', locale)} />
      </div>

      <button type="submit" className="form-submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
        {status === 'sending' ? t('form.sending', locale) : t('form.submit', locale)}
      </button>
      <p className={`form-status ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`} aria-live="polite">
        {status === 'success' && t('form.success', locale)}
        {status === 'error' && t('form.error', locale)}
      </p>
    </form>
  );
}
