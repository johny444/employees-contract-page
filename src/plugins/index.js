/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "@/stores";
import router from "@/router";
import { i18n } from "@/lang/translator";
import mixin from "@/mixin.js";
export function registerPlugins(app) {
  app.use(vuetify).use(router).use(pinia).use(i18n).mixin(mixin);
}
