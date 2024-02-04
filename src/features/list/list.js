import { findAnimeById, getAnimeEpisodeCount } from "../../lib/anime.js";
import { WatchlistModel } from "../../models/watchlist.js";
import { animeExpired } from "./list.subjects.js";

export async function getList() {
  return (await WatchlistModel.find((b) => b.where({}))).map((x) => {
    x.mal_id = Number(x.mal_id);
    x.episodes = Number(x.episodes);

    const staleTime = new Date().getTime() - 5 * 60 * 1000;

    if (new Date(x.last_scraped_at).getTime() <= staleTime) {
      animeExpired.next(x.mal_id);
    }

    return x;
  });
}

export async function scrapeAnime(malId, force = false) {
  const existing = await WatchlistModel.findOne((b) =>
    b.where({
      mal_id: Number(malId).toFixed(1),
    })
  );

  if (existing && !force) {
    return false;
  }

  const info = await findAnimeById(malId);
  const airedCount = await getAnimeEpisodeCount(malId);
  const animeDetails = info.data;

  if (!existing) {
    await WatchlistModel.insert({
      mal_id: animeDetails.mal_id,
      name: animeDetails.title_english || animeDetails.title,
      last_scraped_at: new Date(),
      aired: airedCount,
      episodes: animeDetails.episodes,
      status: animeDetails.status,
      is_completed: false,
    });
  } else {
    await WatchlistModel.updateById(existing.id, {
      mal_id: animeDetails.mal_id,
      name: animeDetails.title_english || animeDetails.title,
      last_scraped_at: new Date(),
      aired: airedCount,
      episodes: animeDetails.episodes,
      status: animeDetails.status,
      is_completed: false,
    });
  }

  return true;
}
