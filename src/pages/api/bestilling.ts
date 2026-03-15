import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Honeypot — bots fill hidden fields, real users don't
  const honeypot = data.get('website')?.toString().trim();
  if (honeypot) {
    // Pretend success so bots don't retry
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const navn = data.get('navn')?.toString().trim();
  const epost = data.get('epost')?.toString().trim();
  const telefon = data.get('telefon')?.toString().trim() || '–';
  const type = data.get('type')?.toString().trim();
  const dato = data.get('dato')?.toString().trim() || 'Ikke oppgitt';
  const antall = data.get('antall')?.toString().trim() || 'Ikke oppgitt';
  const melding = data.get('melding')?.toString().trim();

  if (!navn || !epost || !type || !melding) {
    return new Response(JSON.stringify({ error: 'Mangler påkrevde felt' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(epost)) {
    return new Response(JSON.stringify({ error: 'Ugyldig e-postadresse' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send email via Resend (set RESEND_API_KEY in Vercel env vars)
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const typeLabels: Record<string, string> = {
    servering: 'Servering',
    overnatting: 'Overnatting',
    selskap: 'Selskap / arrangement',
    omvisning: 'Omvisning',
    annet: 'Annet',
  };

  const emailBody = `Ny henvendelse fra kontaktskjemaet på hamnvikhandelssted.com

Navn: ${navn}
E-post: ${epost}
Telefon: ${telefon}
Type: ${typeLabels[type] || type}
Ønsket dato: ${dato}
Antall gjester: ${antall}

Melding:
${melding}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Hamnvik Handelssted <noreply@hamnvikhandelssted.com>',
        to: ['post@hamnvikhandelssted.com'],
        reply_to: epost,
        subject: `Henvendelse: ${typeLabels[type] || type} – ${navn}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response(JSON.stringify({ error: 'Kunne ikke sende e-post' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Email send error:', err);
    return new Response(JSON.stringify({ error: 'Serverfeil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
