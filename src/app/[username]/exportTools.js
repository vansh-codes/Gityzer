// exportTools.js
// This file exports metadata for the export toolbar. Actions are bound
// to local functions in the page that import these descriptors so they can
// access the page's closure (username, imageUrl, etc.).

export const items = [
  { key: "markdown", label: "MARKDOWN", title: "Copy markdown to clipboard", icon: "/markdown.svg", action: "markdown" },
  { key: "download", label: "DOWNLOAD", title: "Download the image as PNG", icon: "/download.svg", action: "download" },
  { key: "url", label: "URL", title: "Copy image URL to clipboard", icon: "/url.svg", action: "url" },
  { key: "img", label: "<IMG />", title: "Copy <img> tag to clipboard", icon: "/img.svg", action: "img" },
];