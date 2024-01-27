import axios from "redaxios";

export function searchAnime(searchTerm) {
  const sp = new URLSearchParams();
  sp.append("q", searchTerm);
  sp.append("limit", 10);
  return axios
    .get(`https://api.jikan.moe/v4/anime?${sp.toString()}`)
    .then((d) => d.data);
}

export function findAnimeById(id) {
  return axios.get(`https://api.jikan.moe/v4/anime/${id}`).then((d) => d.data);
}

export async function getAnimeEpisodeCount(id) {
  const information = await axios
    .get(`https://api.jikan.moe/v4/anime/${id}/episodes`)
    .then((d) => d.data);

  return information.data.length;
}
