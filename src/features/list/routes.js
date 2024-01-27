// @jsx h
import h from "vhtml";
import Router from "@koa/router";
import { Layout } from "../../components/layout.js";
import { getList, scrapeAnime } from "./list.js";
const router = new Router();
import { css } from "goober";
import { styles } from "../../styles.js";

router.get("/", async (ctx) => {
  const result = await getList();

  ctx.body = (
    <Layout>
      <div className={styles.baseContainer}>
        <form
          method="post"
          action="/scrape"
          className={css`
            display: flex;
            align-items: center;
            gap: 10px;
          `}
        >
          <div
            className={css`
              flex: 1;
              width: 100%;
            `}
          >
            <input
              type="text"
              placeholder="MAL ID"
              name="malId"
              className={styles.textField}
            />
          </div>
          <div>
            <button className={styles.button}>Add</button>
          </div>
        </form>

        <section
          className={css`
            margin-top: 100px;
          `}
        >
          <ul
            className={css`
              margin: 0px;
              padding: 0px;
              list-style-type: none;
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            {result.map((x) => {
              return (
                <li
                  className={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}
                >
                  <p
                    className={css`
                      display: flex;
                      gap: 8px;
                      flex: 2;
                    `}
                  >
                    <a
                      href={`https://myanimelist.net/anime/${x.mal_id}`}
                      className={css`
                        color: #868e96;
                        text-decoration: none;

                        &:hover {
                          color: #212529;
                          text-decoration: underline;
                          text-underline-offset: 4px;
                        }
                      `}
                    >
                      <span>#{x.mal_id}</span>
                    </a>{" "}
                    <span>{x.name}</span>
                  </p>
                  <p
                    className={css`
                      display: flex;
                      gap: 4px;
                      color: #212529;
                      font-weight: 600;
                      font-size: 12px;
                    `}
                  >
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
