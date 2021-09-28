import { join } from "path";
import juice from "juice";

export default {
  target: "static",
  buildModules: ["@nuxtjs/tailwindcss"],
  components: true,
  build: {
    postcss: {
      plugins: {
        // We need to use tailwindcss here to make others postcss plugins load in here
        tailwindcss: join(__dirname, "tailwind.config.js"),
        "postcss-css-variables": {
          preserve: false
        }
      }
    }
  },
  hooks: {
    "generate:page": async page => {
      // Juice will inline the css style in the html
      page.html = juice(page.html);

      // Comb is used to purge unused css.
      // page.html = comb(page.html).result;
    }
  }
};
