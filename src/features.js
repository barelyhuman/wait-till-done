import { router as listRouter } from "./features/list/routes";

export function bootFeatures(app) {
  useRouter(listRouter, app);
}

function useRouter(router, app) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}
