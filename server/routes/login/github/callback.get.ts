import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "~/server/utils/auth";
import { github, inMemoryTokens } from "~/server/utils/providers/github";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);

    inMemoryTokens.data = tokens;

    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    if (githubUser.login !== process.env.VALID_AUTHENTICATED_USER) {
      return sendRedirect(event, "/");
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize(),
    );
    return sendRedirect(event, "/");
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      throw createError({
        status: 400,
      });
    }
    throw createError({
      status: 500,
    });
  }
});

interface GitHubUser {
  id: string;
  login: string;
}
