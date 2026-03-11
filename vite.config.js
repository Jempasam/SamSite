import path from "path";

/** @type {import('vite').UserConfig} */
export default {
  build: {
    outDir: path.join(__dirname, "docs"),
  },
  base: "/SamSite/",
};