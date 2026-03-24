import { initLucideIcons } from "./modules/lucide.js";
import { initNavigation } from "./modules/navigation.js";
import { initStageDemo } from "./modules/stage-demo.js";
import { initFeRoleDemo } from "./modules/fe-role-demo.js";
import { initApiDemo } from "./modules/api-demo.js";

document.addEventListener("DOMContentLoaded", () => {
  initLucideIcons();
  initNavigation();
  initStageDemo();
  initFeRoleDemo();
  initApiDemo();
});
