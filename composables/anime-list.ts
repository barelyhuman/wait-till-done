export const useAnimeList = () => {
  const { data, error, pending } = useFetch(() => "/api/anime-list");

  if (error.value) {
    console.error("Error fetching anime-list", error.value);
  }
  return pending.value ? [] : data;
};
