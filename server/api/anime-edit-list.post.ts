import { fetchDataInput, updateDataInput } from "./fetchDataInput";

export default defineEventHandler(async (event) => {
  const token = event.context.githubTokens?.accessToken;
  const accessToken = process.env.GITHUB_PAT || "";
  const dataRepo = process.env.DATA_REPO;
  const body = await readBody(event);
  const dataInput = await fetchDataInput(token, dataRepo);
  const updated = await updateDataInput(
    accessToken,
    dataRepo,
    body.content,
    dataInput.sha,
  );
  return updated;
});
