import { fetchDataInput, updateDataInput } from "./fetchDataInput";

export default defineEventHandler(async (event) => {
  const token = event.context.githubTokens?.accessToken;
  const dataRepo = process.env.DATA_REPO;
  const body = await readBody(event);
  console.log({ body: body.content });
  const dataInput = await fetchDataInput(token, dataRepo);
  const updated = await updateDataInput(
    token,
    dataRepo,
    body.content,
    dataInput.sha,
  );
  return updated;
});
