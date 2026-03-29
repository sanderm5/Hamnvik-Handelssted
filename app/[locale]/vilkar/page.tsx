import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vilkår for bruk | Hamnvik Handelssted',
  description: 'Vilkår for bruk av nettstedet hamnvikhandelssted.com.',
};

export default function VilkarPage() {
  return (
    <main id="main-content" className="main-content">
      <h1>Vilkår for bruk</h1>
      <p className="page-intro">Ved å bruke nettstedet hamnvikhandelssted.com aksepterer du følgende vilkår. Dersom du ikke godtar vilkårene, ber vi deg om å ikke benytte nettstedet.</p>

      <hr className="divider" />
      <h2 className="section-heading">Opphavsrett</h2>
      <p>Alt innhold på nettstedet – inkludert tekst, fotografier, illustrasjoner, grafikk og design – er beskyttet av åndsverkloven og tilhører Hamnvik Handelssted eller de respektive rettighetshaverne. Innholdet kan ikke kopieres, distribueres eller brukes til kommersielle formål uten skriftlig samtykke.</p>

      <hr className="divider" />
      <h2 className="section-heading">Tillatt bruk</h2>
      <p>Nettstedet er ment for personlig, ikke-kommersiell bruk. Du kan fritt lese og dele lenker til nettstedet. Gjengivelse av innhold utover dette krever tillatelse.</p>

      <hr className="divider" />
      <h2 className="section-heading">Ansvarsfraskrivelse</h2>
      <p>Informasjonen på nettstedet gis &laquo;som den er&raquo; og &laquo;som tilgjengelig&raquo;, uten garantier av noe slag. Hamnvik Handelssted gir ingen garantier for nøyaktigheten, fullstendigheten, aktualiteten eller påliteligheten av informasjonen.</p>

      <hr className="divider" />
      <h2 className="section-heading">Tilgjengelighet og driftsstabilitet</h2>
      <p>Hamnvik Handelssted garanterer ikke at nettstedet vil være tilgjengelig uten avbrudd, feilfritt eller fritt for skadelig programvare.</p>

      <hr className="divider" />
      <h2 className="section-heading">Ansvarsbegrensning</h2>
      <p>I den utstrekning gjeldende lov tillater det, kan verken Hamnvik Handelssted, Ibestad kommunes fotefarprosjekt, eller deres samarbeidspartnere holdes ansvarlig for direkte, indirekte, tilfeldige eller spesielle skader som måtte oppstå i forbindelse med bruk av nettstedet.</p>

      <hr className="divider" />
      <h2 className="section-heading">Teknisk leveranse og innholdsansvar</h2>
      <p>Nettstedet er utviklet og levert som en teknisk løsning av en ekstern utvikler/leverandør. Alt ansvar for nettstedets innhold ligger utelukkende hos Hamnvik Handelssted som innholdseier og behandlingsansvarlig.</p>

      <hr className="divider" />
      <h2 className="section-heading">Eksterne lenker</h2>
      <p>Nettstedet kan inneholde lenker til eksterne nettsteder. Hamnvik Handelssted har ingen kontroll over, og påtar seg intet ansvar for, innholdet til tredjeparts nettsteder.</p>

      <hr className="divider" />
      <h2 className="section-heading">Force majeure</h2>
      <p>Hamnvik Handelssted er ikke ansvarlig for manglende oppfyllelse av forpliktelser som skyldes forhold utenfor rimelig kontroll.</p>

      <hr className="divider" />
      <h2 className="section-heading">Endringer</h2>
      <p>Hamnvik Handelssted forbeholder seg retten til å endre disse vilkårene når som helst uten forvarsel. Fortsatt bruk av nettstedet etter endringer anses som aksept av de oppdaterte vilkårene.</p>

      <hr className="divider" />
      <h2 className="section-heading">Lovvalg og verneting</h2>
      <p>Disse vilkårene er underlagt norsk lov. Eventuelle tvister skal avgjøres ved Nord-Troms og Senja tingrett som avtalt verneting.</p>

      <hr className="divider" />
      <h2 className="section-heading">Kontakt</h2>
      <p>Spørsmål om vilkårene kan rettes til <a href="mailto:post@hamnvikhandelssted.com">post@hamnvikhandelssted.com</a>.</p>
      <p><em>Sist oppdatert: mars 2026</em></p>
    </main>
  );
}
