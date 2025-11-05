// selectTools.js
// Descriptor list for the configuration selects used in the preview page.
// Actions (onChange) are handled by the page so descriptors only contain static data.

export const selects = [
  {
    key: "theme",
    name: "theme",
    label: "Theme",
    title: "Select theme",
    options: [
      { value: "dark", label: "Dark" },
      { value: "light", label: "Light" },
    ],
  },
  {
    key: "font",
    name: "font",
    label: "Font",
    title: "Select font",
    options: [
      { value: "helvetica", label: "Helvetica" },
      { value: "arial", label: "Arial" },
      { value: "timesnewroman", label: "Times New Roman" },
      { value: "calibri", label: "Calibri" },
      { value: "verdana", label: "Verdana" },
    ],
  },
  {
    key: "pattern",
    name: "pattern",
    label: "Pattern",
    title: "Select pattern",
    options: [
      { value: "shape 1", label: "Shape 1" },
      { value: "shape 2", label: "Shape 2" },
    ],
  },
];