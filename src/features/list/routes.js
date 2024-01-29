// @jsx h
import Router from "@koa/router";
import { Layout } from "../../components/layout.js";
import { LoginForm } from "../../components/login-form.js";
import { loginStatus } from "../../middleware/auth.js";
import { getList, scrapeAnime } from "./list.js";
const router = new Router();

router.get("/", loginStatus, async (ctx) => {
  const result = await getList();
  const isLoggedIn = ctx.isLoggedIn;
  const errors = ctx.flash("error");

  ctx.body = (
    <Layout errors={errors}>
      <div class="p-[1rem] text-md max-w-[900px] text-gray-600 mx-auto">
        {isLoggedIn ? (
          <form
            method="post"
            action="/scrape"
            class="flex items-center gap-2 max-w-[50%] ml-auto"
          >
            <div class="flex-1 w-full">
              <input
                type="text"
                placeholder="MAL ID"
                name="malId"
                class="input"
              />
            </div>
            <div>
              <button className="btn">Add</button>
            </div>
          </form>
        ) : (
          <LoginForm />
        )}

        <section class="mt-44">
          <ul class="m-0 p-0 flex flex-col gap-4">
            {result.map((x) => {
              return (
                <li class="flex items-center justify-between">
                  <p class="flex gap-4 flex-[2]">
                    <a
                      href={`https://myanimelist.net/anime/${x.mal_id}`}
                      class="decoration-none text-right text-gray-400 hover:underline hover:text-gray-800 hover:underline-offset-4 w-14"
                    >
                      <span>#{x.mal_id}</span>
                    </a>
                    <span>{x.name}</span>
                  </p>
                  <p class="flex gap-1 font-bold text-sm">
                    {x.aired}/{x.episodes}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </Layout>
  );
});

router.post("/scrape", async (ctx) => {
  const body = ctx.request.body;

  await scrapeAnime(body.malId);

  ctx.status = 303;
  ctx.redirect("/");
  return;
});

export { router };
