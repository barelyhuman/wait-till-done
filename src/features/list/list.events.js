import { scrapeAnime } from "./list.js";
import { animeExpired } from "./list.subjects.js";



export function init() {
  animeExpired.subscribe(async (value) => {
    try {
      console.log(`Scraping:${value}`);
      await scrapeAnime(value, true);
    } catch (err) {
      console.error(`Error: scraping ${value}`, err);
    }
  });
}
