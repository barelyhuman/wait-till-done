import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import { dirname, join } from "path";
import { bootFeatures } from "./features";
import { secure } from "./security";
import session from "koa-session";
import "./styles.css";
import { fileURLToPath } from "url";
import { flashMiddleware } from "./lib/flash.js";

const app = new Koa();

app.use(bodyParser());
app.use(session(app, { signed: false }));
app.use(flashMiddleware());
app.use(secure);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "public");

app.use(async (ctx, next) => {
  ctx.errors = [];
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.url.startsWith("/assets")) {
    await serve(root)(ctx, next);
    return;
  }
  await next();
});

// Feature Imports
bootFeatures(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
