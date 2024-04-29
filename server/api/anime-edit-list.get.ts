import { AnimeInputList, fetchDataInput } from "./fetchDataInput";

export default defineEventHandler(async (event) => {
  const token = event.context.githubTokens?.accessToken;
  const dataRepo = process.env.DATA_REPO;

  const dataInput = await fetchDataInput(token, dataRepo);

  return dataInput.content as AnimeInputList;
});


