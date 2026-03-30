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
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "87a14429-aeb8-4567-96a3-d266d694ecdf",
  token: process.env.NEXT_PUBLIC_TINA_TOKEN || "13ab6b55f477c8eb64b986bfc2f4c5df826a69b8",
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
      // === SINGLETONS (one file per page) ===
      {
        name: "hjem",
        label: "Forside",
        path: "content/pages",
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
        name: "historie",
        label: "Historie",
        path: "content/pages",
        format: "yaml",
        match: { include: "historie" },
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
        path: "content/pages",
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
        path: "content/pages",
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
        name: "kulturformidling",
        label: "Kulturformidling",
        path: "content/pages",
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
        name: "arkiv",
        label: "Arkiv",
        path: "content/pages",
        format: "yaml",
        match: { include: "arkiv" },
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
          }
        ]
      },
      {
        name: "restaurering",
        label: "Restaurering",
        path: "content/pages",
        format: "yaml",
        match: { include: "restaurering" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Oppdateringer (nyeste f\xF8rst)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(Uten overskrift)" }) },
            fields: sectionFields
          }
        ]
      },
      // === SINGLETONS — ENGLISH ===
      {
        name: "hjemEn",
        label: "Forside (English)",
        path: "content/pages",
        format: "yaml",
        match: { include: "hjem.en" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "string",
            name: "bodyText1",
            label: "Body text paragraph 1",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "bodyText2",
            label: "Body text paragraph 2",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "pullQuote",
            label: "Pull quote",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "cards",
            label: "Experience cards",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Card" }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "link", label: "Link (e.g. /en/servering)" },
              { type: "string", name: "description", label: "Description" }
            ]
          },
          { type: "string", name: "dampskipHeading", label: "Steamship heading" },
          {
            type: "string",
            name: "dampskipText",
            label: "Steamship text",
            ui: { component: "textarea" }
          },
          { type: "image", name: "dampskipImage", label: "Steamship image" },
          { type: "string", name: "dampskipImageAlt", label: "Steamship image alt text" },
          { type: "string", name: "dampskipImageCaption", label: "Steamship image caption" },
          { type: "string", name: "dampskipFotefarText", label: "Fotefar text" },
          { type: "string", name: "noticeTitle", label: "Notice box title" },
          {
            type: "string",
            name: "noticeText",
            label: "Notice box text",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "testimonials",
            label: "Guest quotes",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.source || "Quote" }) },
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                ui: { component: "textarea" }
              },
              { type: "string", name: "source", label: "Source" }
            ]
          }
        ]
      },
      {
        name: "historieEn",
        label: "Historie (English)",
        path: "content/pages",
        format: "yaml",
        match: { include: "historie.en" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "string",
            name: "introBody",
            label: "Intro body text",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "pullQuote1",
            label: "Pull quote 1",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(No heading)" }) },
            fields: sectionFields
          }
        ]
      },
      {
        name: "kontaktEn",
        label: "Kontakt (English)",
        path: "content/pages",
        format: "yaml",
        match: { include: "kontakt.en" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "contacts",
            label: "Contact persons",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Person" }) },
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "phone", label: "Phone" }
            ]
          },
          { type: "string", name: "generalEmail", label: "General email" },
          { type: "string", name: "businessName", label: "Business name" },
          { type: "string", name: "addressLine1", label: "Address line 1" },
          { type: "string", name: "addressLine2", label: "Address line 2" },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(No heading)" }) },
            fields: sectionFields
          }
        ]
      },
      {
        name: "serveringEn",
        label: "Servering (English)",
        path: "content/pages",
        format: "yaml",
        match: { include: "servering.en" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(No heading)" }) },
            fields: sectionFields
          },
          { type: "string", name: "noticeTitle", label: "Notice box title" },
          {
            type: "string",
            name: "noticeText",
            label: "Notice box text",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "kulturformidlingEn",
        label: "Kulturformidling (English)",
        path: "content/pages",
        format: "yaml",
        match: { include: "kulturformidling.en" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(No heading)" }) },
            fields: sectionFields
          },
          { type: "string", name: "noticeTitle", label: "Notice box title" },
          {
            type: "string",
            name: "noticeText",
            label: "Notice box text",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "arkivEn",
        label: "Arkiv (English)",
        path: "content/pages",
        format: "yaml",
        match: { include: "arkiv.en" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "gallerySections",
            label: "Gallery sections",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "Section" }) },
            fields: [
              { type: "string", name: "heading", label: "Section name" },
              {
                type: "string",
                name: "description",
                label: "Description (optional)",
                ui: { component: "textarea" }
              },
              { type: "string", name: "photoCredit", label: "Photo credit (optional)" },
              {
                type: "object",
                name: "images",
                label: "Images",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.alt || "Image" }) },
                fields: [
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "alt", label: "Alt text" },
                  { type: "string", name: "caption", label: "Caption (optional)" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "restaureringEn",
        label: "Restaurering (English)",
        path: "content/pages",
        format: "yaml",
        match: { include: "restaurering.en" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          ...pageHeaderFields,
          {
            type: "object",
            name: "sections",
            label: "Updates (newest first)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "(No heading)" }) },
            fields: sectionFields
          }
        ]
      },
      // === COLLECTIONS ===
      {
        name: "referanser",
        label: "Referanser",
        path: "content/referanser",
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
        label: "Program / Nyheter",
        path: "content/nyheter",
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
