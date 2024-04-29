export default defineEventHandler(async (event) => {
  const token = event.context.githubTokens?.accessToken;
  const dataRepo = process.env.DATA_REPO;

  const headers: Headers = new Headers();
  if (token) {
    headers.append(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const data = await fetch(
    `https://api.github.com/repos/${dataRepo}/contents/data/anime.json`,
    {
      headers: headers,
    },
  ).then((d) => {
    if (!d.ok) {
      throw d;
    }
    return d.json();
  });

  const ghObject = {
    name: data.name,
    sha: data.sha,
    content: JSON.parse(atob(data.content)),
  };

  return ghObject.content.json as Array<AnimeList>;
});

type AnimeList = {
  id: string;
  value: {
    title: string;
    episodes: {
      aired: number;
      total: number;
    };
  };
};
