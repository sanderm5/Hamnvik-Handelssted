import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData();

  // Honeypot
  const honeypot = data.get('website')?.toString().trim();
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const navn = data.get('navn')?.toString().trim();
  const epost = data.get('epost')?.toString().trim();
  const telefon = data.get('telefon')?.toString().trim() || '–';
  const type = data.get('type')?.toString().trim();
  const dato = data.get('dato')?.toString().trim() || 'Ikke oppgitt';
  const antall = data.get('antall')?.toString().trim() || 'Ikke oppgitt';
  const melding = data.get('melding')?.toString().trim();

  if (!navn || !epost || !type || !melding) {
    return NextResponse.json({ error: 'Mangler påkrevde felt' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(epost)) {
    return NextResponse.json({ error: 'Ugyldig e-postadresse' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const typeLabels: Record<string, string> = {
    servering: 'Servering',
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
      return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json({ error: 'Serverfeil' }, { status: 500 });
  }
}
