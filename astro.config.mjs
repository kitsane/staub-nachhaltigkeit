import { defineConfig } from "astro/config";
import NetlifyCMS from "astro-netlify-cms";

const markdown = (label, name) => ({
  label,
  name,
  widget: "markdown",
  modes: ["rich_text"],
  buttons: [
    "bold",
    "italic",
    "link",
    "heading-one",
    "heading-two",
    "quote",
    "bulleted-list",
  ],
  editor_components: ["image"],
});
const metaFields = [
  {
    name: "slug",
    widget: "string",
    label: "Adresse im Browser",
  },
  {
    name: "tab_title",
    widget: "string",
    label: "Titel im Browser Tab und in der Vorschau für die Suchmaschine",
    i18n: true,
  },
  {
    name: "meta_description",
    widget: "string",
    required: false,
    label:
      "Beschreibung in der Vorschau für die Suchmaschine, sollte kurz und knackig sein.",
    i18n: true,
  },
];
const navigationFields = [
  {
    name: "show_in_navigation",
    widget: "boolean",
    default: true,
    required: false,
    label: "Soll die Seite in der Navigation angezeigt werden?",
  },
  {
    name: "navigation_title",
    widget: "string",
    required: false,
    label: "Titel der in der Seitennavigation dargestellt wird.",
    i18n: true,
  },
  {
    name: "navigation_order",
    widget: "number",
    required: false,
    label: "Position in der Navigation",
  },
];
const freeText = {
  name: "content",
  widget: "object",
  label: "Inhalt",
  field: markdown("Freitext", "free_text"),
  i18n: true,
};
const contact = {
  name: "contact",
  widget: "object",
  label: "Kontakt",
  i18n: true,
  fields: [
    {
      label: "Bild",
      name: "image",
      widget: "image",
      allow_multiple: false,
    },
    {
      label: "Bildunterschrift",
      name: "image_description",
      widget: "string",
      i18n: true,
    },
  ],
};
const primaryContent = [
  {
    name: "title",
    widget: "text",
    label: "Titel der vor dem Inhalt dargestellt wird",
    required: false,
    i18n: true,
  },
  {
    name: "content",
    label: "Primärer Inhalt",
    widget: "list",
    collapsed: false,
    required: false,
    i18n: true,
    types: [
      freeText,
      {
        name: "list",
        widget: "object",
        label: "Listen Punkt",
        field: markdown("Listen Punk", "list"),
        i18n: true,
      },
      {
        name: "image",
        widget: "object",
        label: "Bild",
        fields: [
          {
            label: "Bildtitel",
            name: "image_title",
            widget: "string",
            i18n: true,
          },
          {
            label: "Bild",
            name: "image",
            widget: "image",
            allow_multiple: false,
          },
          {
            label: "Bildunterschrift",
            name: "image_description",
            widget: "string",
            i18n: true,
          },
        ],
      },
    ],
  },
];
const secondaryContent = [
  {
    name: "secondary_content",
    label: "Secondary Content",
    widget: "list",
    collapsed: false,
    required: false,
    types: [freeText, contact],
    i18n: true,
  },
];

// https://astro.build/config
export default defineConfig({
  integrations: [
    NetlifyCMS({
      config: {
        site_url: "https://staub-nachhaltigkeit.ch/",
        display_url: "https://staub-nachhaltigkeit.ch/",
        backend: {
          name: "git-gateway",
          branch: "master",
          repo: "kitsane/staub-nachhaltigkeit",
        },
        media_folder: "public/assets/pages",
        public_folder: "/assets/pages",
        i18n: {
          structure: "single_file",
          locales: ["de", "en"],
          default_locale: "de",
        },
        publish_mode: "editorial_workflow",
        collections: [
          {
            identifier_field: "slug",
            i18n: true,
            name: "pages",
            label: "Pages",
            folder: "src/content/pages",
            label_singular: "Page",
            sortable_fields: ["navigation_order"],
            summary: "{{slug}} - {{tab_title}}",
            create: true,
            delete: true,
            fields: [
              ...metaFields,
              ...navigationFields,
              ...primaryContent,
              ...secondaryContent,
            ],
          },
        ],
      },
    }),
  ],
});
