// tina/config.ts
import { defineConfig } from "tinacms";
var sectionFields = [
  {
    type: "string",
    name: "heading",
    label: "Overskrift (valgfritt)"
  },
  {
    type: "string",
    name: "content",
    label: "Tekst",
    ui: { component: "textarea" }
  },
  {
    type: "image",
    name: "image",
    label: "Bilde (valgfritt)"
  },
  {
    type: "string",
    name: "imageAlt",
    label: "Bilde alt-tekst"
  },
  {
    type: "string",
    name: "imageCaption",
    label: "Bildetekst"
  },
  {
    type: "string",
    name: "pullQuote",
    label: "Sitat (valgfritt)",
    ui: { component: "textarea" }
  }
];
var pageHeaderFields = [
  { type: "string", name: "heading", label: "Overskrift", required: true },
  { type: "string", name: "deck", label: "Undertittel" },
  { type: "string", name: "byline", label: "Byline" },
  {
    type: "string",
    name: "intro",
    label: "Intro",
    ui: { component: "textarea" }
  }
];
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID || "dummy",
  token: process.env.TINA_TOKEN || "dummy",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // === SINGLETONS (én fil per side) ===
      {
        name: "hjem",
        label: "Forside",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "hjem" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "string",
            name: "bodyText1",
            label: "Br\xF8dtekst avsnitt 1",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "bodyText2",
            label: "Br\xF8dtekst avsnitt 2",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "pullQuote",
            label: "Sitat",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "cards",
            label: "Opplev-kort",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Kort" }) },
            fields: [
              { type: "string", name: "title", label: "Tittel" },
              { type: "string", name: "link", label: "Lenke (f.eks. /servering)" },
              { type: "string", name: "description", label: "Beskrivelse" }
            ]
          },
          { type: "string", name: "dampskipHeading", label: "Dampskip-overskrift" },
          {
            type: "string",
            name: "dampskipText",
            label: "Dampskip-tekst",
            ui: { component: "textarea" }
          },
          { type: "image", name: "dampskipImage", label: "Dampskip-bilde" },
          { type: "string", name: "dampskipImageAlt", label: "Dampskip-bilde alt-tekst" },
          { type: "string", name: "dampskipImageCaption", label: "Dampskip-bildetekst" },
          { type: "string", name: "dampskipFotefarText", label: "Fotefar-tekst" },
          { type: "string", name: "noticeTitle", label: "Infoboks tittel" },
          {
            type: "string",
            name: "noticeText",
            label: "Infoboks tekst",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "testimonials",
            label: "Gjestesitater",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.source || "Sitat" }) },
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Sitat",
                ui: { component: "textarea" }
              },
              { type: "string", name: "source", label: "Kilde" }
            ]
          }
        ]
      },
      {
        name: "omOss",
        label: "Om oss",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "om-oss" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "string",
            name: "introBody",
            label: "Innledning br\xF8dtekst",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "pullQuote1",
            label: "Sitat 1",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "sections",
            label: "Seksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          }
        ]
      },
      {
        name: "kontakt",
        label: "Kontakt",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "kontakt" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "contacts",
            label: "Kontaktpersoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Person" }) },
            fields: [
              { type: "string", name: "name", label: "Navn" },
              { type: "string", name: "email", label: "E-post" },
              { type: "string", name: "phone", label: "Telefon" }
            ]
          },
          { type: "string", name: "generalEmail", label: "Generell e-post" },
          { type: "string", name: "businessName", label: "Bedriftsnavn" },
          { type: "string", name: "addressLine1", label: "Adresselinje 1" },
          { type: "string", name: "addressLine2", label: "Adresselinje 2" },
          {
            type: "object",
            name: "sections",
            label: "Seksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          }
        ]
      },
      {
        name: "servering",
        label: "Servering",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "servering" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Seksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          },
          { type: "string", name: "noticeTitle", label: "Infoboks tittel" },
          {
            type: "string",
            name: "noticeText",
            label: "Infoboks tekst",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "overnatting",
        label: "Overnatting",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "overnatting" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Seksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          },
          {
            type: "object",
            name: "priser",
            label: "Priser",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Pris" }) },
            fields: [
              { type: "string", name: "label", label: "Type" },
              { type: "string", name: "price", label: "Pris" }
            ]
          },
          { type: "string", name: "prisNotat", label: "Prisnotat" },
          { type: "string", name: "noticeTitle", label: "Infoboks tittel" },
          {
            type: "string",
            name: "noticeText",
            label: "Infoboks tekst",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "kulturformidling",
        label: "Kulturformidling",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "kulturformidling" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Seksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          },
          { type: "string", name: "noticeTitle", label: "Infoboks tittel" },
          {
            type: "string",
            name: "noticeText",
            label: "Infoboks tekst",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "krambu",
        label: "Krambu",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "krambu" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Seksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          },
          { type: "string", name: "noticeTitle", label: "Infoboks tittel" },
          {
            type: "string",
            name: "noticeText",
            label: "Infoboks tekst",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "bilder",
        label: "Bildegalleri",
        path: "src/content/pages",
        format: "yaml",
        match: { include: "bilder" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "gallerySections",
            label: "Galleriseksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "Seksjon" }) },
            fields: [
              { type: "string", name: "heading", label: "Seksjonsnavn" },
              {
                type: "string",
                name: "description",
                label: "Beskrivelse (valgfritt)",
                ui: { component: "textarea" }
              },
              { type: "string", name: "photoCredit", label: "Fotokreditt (valgfritt)" },
              {
                type: "object",
                name: "images",
                label: "Bilder",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.alt || "Bilde" }) },
                fields: [
                  { type: "image", name: "image", label: "Bilde" },
                  { type: "string", name: "alt", label: "Alt-tekst" },
                  { type: "string", name: "caption", label: "Bildetekst (valgfritt)" }
                ]
              }
            ]
          },
          { type: "string", name: "restaureringHeading", label: "Restaurering overskrift" },
          {
            type: "string",
            name: "restaureringText",
            label: "Restaurering tekst",
            ui: { component: "textarea" }
          }
        ]
      },
      // === COLLECTIONS ===
      {
        name: "referanser",
        label: "Referanser",
        path: "src/content/referanser",
        format: "yaml",
        fields: [
          {
            type: "string",
            name: "quote",
            label: "Sitat",
            ui: { component: "textarea" }
          },
          { type: "string", name: "source", label: "Kilde", isTitle: true, required: true },
          { type: "string", name: "date", label: "Dato (valgfritt)" },
          {
            type: "string",
            name: "context",
            label: "Kontekst (valgfritt)",
            ui: { component: "textarea" }
          },
          { type: "number", name: "sortOrder", label: "Sorteringsrekkef\xF8lge" }
        ]
      },
      {
        name: "nyheter",
        label: "Nyheter",
        path: "src/content/nyheter",
        format: "yaml",
        fields: [
          { type: "string", name: "title", label: "Tittel", isTitle: true, required: true },
          { type: "string", name: "deck", label: "Undertittel" },
          { type: "string", name: "byline", label: "Byline" },
          { type: "string", name: "date", label: "Dato" },
          {
            type: "string",
            name: "intro",
            label: "Intro",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "sections",
            label: "Seksjoner",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          },
          { type: "string", name: "photoCredit", label: "Fotokreditt" },
          {
            type: "object",
            name: "galleryImages",
            label: "Bildegalleri",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.alt || "Bilde" }) },
            fields: [
              { type: "image", name: "image", label: "Bilde" },
              { type: "string", name: "alt", label: "Alt-tekst" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
