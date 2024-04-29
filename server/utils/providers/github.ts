import { GitHub, GitHubTokens } from "arctic";

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
);

export const inMemoryTokens: {
  data: GitHubTokens | undefined;
} = {
  data: undefined,
};
