import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiter — maks 5 requests per 15 min per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutter
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Rydd opp gamle entries hvert 30. minutt for å unngå memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n\t]/g, ' ').trim();
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'For mange forespørsler. Prøv igjen senere.' },
      { status: 429 }
    );
  }

  const data = await request.formData();

  // Honeypot
  const honeypot = data.get('website')?.toString().trim();
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const navn = truncate(data.get('navn')?.toString().trim() || '', 200);
  const epost = truncate(data.get('epost')?.toString().trim() || '', 254);
  const telefon = truncate(data.get('telefon')?.toString().trim() || '', 20) || '–';
  const type = truncate(data.get('type')?.toString().trim() || '', 50);
  const dato = truncate(data.get('dato')?.toString().trim() || '', 20) || 'Ikke oppgitt';
  const antall = truncate(data.get('antall')?.toString().trim() || '', 10) || 'Ikke oppgitt';
  const melding = truncate(data.get('melding')?.toString().trim() || '', 5000);

  if (!navn || !epost || !type || !melding) {
    return NextResponse.json({ error: 'Mangler påkrevde felt' }, { status: 400 });
  }

  // Valider type mot tillatte verdier
  const allowedTypes = ['servering', 'selskap', 'omvisning', 'annet'];
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ error: 'Ugyldig type' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(epost) || /[\r\n]/.test(epost)) {
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
        reply_to: sanitizeHeaderValue(epost),
        subject: sanitizeHeaderValue(`Henvendelse: ${typeLabels[type] || type} – ${navn}`),
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
