import { router as listRouter } from "./features/list/routes.js";
import { init as listEvents } from "./features/list/list.events.js";
import { router as loginRouter } from "./features/login/routes.js";

export function bootFeatures(app) {
  useRouter(listRouter, app);
  useRouter(loginRouter, app);
  useEvents(listEvents);
}

function useEvents(init) {
  init();
}

function useRouter(router, app) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}
