import { Subject } from "../../lib/subject.js";
import { scrapeAnime } from "./list.js";

export const animeExpired = new Subject();

animeExpired.subscribe(async (value) => {
  try {
    console.log(`Scraping:${value}`);
    await scrapeAnime(value, true);
  } catch (err) {
    console.error(`Error: scraping ${value}`, err);
  }
});
