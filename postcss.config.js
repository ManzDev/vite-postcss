import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";
import perfectionist from "perfectionist";
import presetEnv from "postcss-preset-env";

const config = {
  atImport: {
    path: [
      "tailwind.config.js",
      "assets/css/*.pcss",
      "assets/css/**/*.pcss",
      "assets/css/",
    ],
  },
  perfectionist: {
    cascade: false,
    indentSize: 2,
    trimLeadingZero: false,
    maxAtRuleLength: false,
    maxSelectorLength: 1,
    maxValueLength: false,
  },
  purgecss: {
    content: [
      "**/*.php",
      "./views/**/*.twig",
      "./assets/**/*.pcss",
      "./assets/**/*.svg",
      "./assets/**/*.js"
    ],
    extractors: [{
      extensions: ["php", "twig", "pcss", "svg", "js"],
      extractor: class TailwindExtractor {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || [];
        }
      },
    }],
    // whitelist: purgecssWordpress.whitelist,
    // whitelistPatterns: purgecssWordpress.whitelistPatterns.concat([]),
  },
};

export default {
  plugins: [
    autoprefixer({ cascade: false }),
    presetEnv({ stage: 0 }),
    postcssImport(config.atImport),
    purgecss(config.purgecss),
    perfectionist(config.perfectionist),
  ]
};
