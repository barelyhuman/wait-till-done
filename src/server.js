import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import { join } from "path";
import { bootFeatures } from "./features";
import { secure } from "./security";
import { setup } from "goober";
import h from "vhtml";

setup(h);

const app = new Koa();

app.use(bodyParser());
app.use(secure);

const root = join(process.cwd(), "src/public");

app.use(async (ctx, next) => {
  if (ctx.url.startsWith("/assets")) {
    await serve(root)(ctx, next);
    return;
  }
  await next();
});

// Feature Imports
bootFeatures(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
