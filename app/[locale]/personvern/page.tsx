import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personvernerklæring | Hamnvik Handelssted',
  description: 'Personvernerklæring for Hamnvik Handelssted. Les om hvordan vi behandler personopplysninger.',
};

export default function PersonvernPage() {
  return (
    <main id="main-content" className="main-content">
      <h1>Personvernerklæring</h1>
      <p className="page-intro">Denne personvernerklæringen beskriver hvordan Hamnvik Handelssted behandler personopplysninger i forbindelse med bruk av nettstedet hamnvikhandelssted.no.</p>

      <hr className="divider" />
      <h2 className="section-heading">Behandlingsansvarlig</h2>
      <p>Behandlingsansvarlig for personopplysninger som samles inn via dette nettstedet er:</p>
      <p><strong>Hamnvik Handelssted</strong><br />Ibestad kommunes fotefarprosjekt<br />Hamnvik, Ibestad kommune, Troms<br />E-post: <a href="mailto:post@hamnvikhandelssted.no">post@hamnvikhandelssted.no</a></p>

      <hr className="divider" />
      <h2 className="section-heading">Hvilke opplysninger samles inn</h2>
      <p>Nettstedet samler inn et minimum av personopplysninger:</p>
      <ul>
        <li><strong>Kontakthenvendelser:</strong> Dersom du sender oss en henvendelse via e-post, lagres navn, e-postadresse og innholdet i meldingen for å kunne besvare henvendelsen.</li>
        <li><strong>Serverlogger:</strong> Ved besøk på nettstedet registreres teknisk informasjon som IP-adresse, nettlesertype og tidspunkt i serverlogger. Disse brukes utelukkende til teknisk drift og sikkerhet.</li>
      </ul>

      <hr className="divider" />
      <h2 className="section-heading">Rettslig grunnlag</h2>
      <p>Behandling av personopplysninger skjer på følgende grunnlag:</p>
      <ul>
        <li><strong>Berettiget interesse</strong> (GDPR art. 6 nr. 1 bokstav f): Serverlogger for teknisk drift og sikkerhet.</li>
        <li><strong>Samtykke</strong> (GDPR art. 6 nr. 1 bokstav a): Når du selv tar kontakt med oss og oppgir personopplysninger.</li>
      </ul>

      <hr className="divider" />
      <h2 className="section-heading">Lagringstid</h2>
      <p>Personopplysninger lagres ikke lenger enn nødvendig for formålet de ble samlet inn for:</p>
      <ul>
        <li><strong>Kontakthenvendelser:</strong> Lagres så lenge det er nødvendig for å besvare og følge opp henvendelsen, normalt inntil 12 måneder etter siste korrespondanse.</li>
        <li><strong>Serverlogger:</strong> Slettes automatisk etter inntil 30 dager, i henhold til hostingleverandørens retningslinjer.</li>
      </ul>

      <hr className="divider" />
      <h2 className="section-heading">Tredjeparter og databehandlere</h2>
      <p>Nettstedet er hostet hos <strong>Vercel Inc.</strong>, som behandler tekniske data (serverlogger) på våre vegne. Vercel opererer i henhold til GDPR og har egnede sikkerhetstiltak på plass. Se <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercels personvernerklæring</a>.</p>
      <p>Vi deler ikke personopplysninger med andre tredjeparter med mindre det er påkrevd ved lov eller nødvendig for å oppfylle våre forpliktelser overfor deg.</p>

      <hr className="divider" />
      <h2 className="section-heading">Overføring til land utenfor EØS</h2>
      <p>Vår hostingleverandør Vercel Inc. har hovedkontor i USA, og tekniske data kan bli behandlet på servere utenfor EØS. Vercel har implementert EUs standardkontraktsklausuler (SCCs) og andre egnede sikkerhetstiltak for å sikre at overføringen skjer i samsvar med GDPR kapittel V.</p>

      <hr className="divider" />
      <h2 className="section-heading">Informasjonskapsler og lokal lagring</h2>
      <p>Nettstedet bruker ikke informasjonskapsler (cookies) til sporing, analyse eller markedsføring. Den eneste lokale lagringen som benyttes er en tema-preferanse (lys/mørk modus) som lagres i nettleserens localStorage. Dette er en strengt nødvendig funksjonell innstilling som ikke inneholder personopplysninger og som ikke krever samtykke etter ekomloven § 2-7b.</p>

      <hr className="divider" />
      <h2 className="section-heading">Dine rettigheter</h2>
      <p>Du har følgende rettigheter etter personopplysningsloven og GDPR:</p>
      <ul>
        <li><strong>Innsynsrett</strong> (art. 15): Du kan be om innsyn i hvilke personopplysninger vi har registrert om deg.</li>
        <li><strong>Retting</strong> (art. 16): Du kan kreve at uriktige opplysninger om deg blir rettet.</li>
        <li><strong>Sletting</strong> (art. 17): Du kan be om at personopplysninger om deg blir slettet når det ikke lenger foreligger grunnlag for behandling.</li>
        <li><strong>Begrensning</strong> (art. 18): Du kan kreve at behandlingen av dine opplysninger begrenses i visse tilfeller.</li>
        <li><strong>Dataportabilitet</strong> (art. 20): Du kan be om å få utlevert dine personopplysninger i et strukturert, alminnelig brukt og maskinlesbart format.</li>
        <li><strong>Protestrett</strong> (art. 21): Du har rett til å protestere mot behandling av dine personopplysninger som er basert på berettiget interesse.</li>
        <li><strong>Tilbaketrekking av samtykke:</strong> Dersom behandlingen er basert på samtykke, kan du når som helst trekke samtykket tilbake.</li>
        <li><strong>Klagerett:</strong> Du har rett til å klage til <a href="https://www.datatilsynet.no">Datatilsynet</a> dersom du mener at behandlingen av dine personopplysninger ikke er i samsvar med regelverket.</li>
      </ul>
      <p>For å utøve dine rettigheter, ta kontakt på e-postadressen nedenfor. Vi vil besvare henvendelsen innen 30 dager.</p>

      <hr className="divider" />
      <h2 className="section-heading">Barn</h2>
      <p>Nettstedet er ikke rettet mot barn under 16 år, og vi samler ikke bevisst inn personopplysninger fra barn.</p>

      <hr className="divider" />
      <h2 className="section-heading">Automatiserte avgjørelser</h2>
      <p>Vi benytter ikke automatisert beslutningstaking eller profilering basert på dine personopplysninger.</p>

      <hr className="divider" />
      <h2 className="section-heading">Endringer i personvernerklæringen</h2>
      <p>Vi forbeholder oss retten til å oppdatere denne personvernerklæringen. Vesentlige endringer vil bli publisert på denne siden med oppdatert dato.</p>

      <hr className="divider" />
      <h2 className="section-heading">Kontakt</h2>
      <p>Spørsmål om personvern kan rettes til:<br /><a href="mailto:post@hamnvikhandelssted.no">post@hamnvikhandelssted.no</a><br />Hamnvik Handelssted, Hamnvik, Ibestad kommune, Troms</p>
      <p><em>Sist oppdatert: 8. mars 2026</em></p>
    </main>
  );
}
