import { type DatabaseSession, type DatabaseUser } from "lucia";

type UserId = string;

const userDetails = (userId = "123"): DatabaseUser => {
  return {
    id: userId,
    attributes: {
      github_id: 1,
      username: "",
    },
  };
};

const sessions = new Map<
  string,
  { sessionDetails: DatabaseSession; user: DatabaseUser; userId: UserId }
>();

export const InMemoryAdator = {
  async deleteExpiredSessions(): Promise<void> {
    for (let session of sessions.entries()) {
      if (session[1].sessionDetails.expiresAt.getTime() > Date.now()) continue;
      sessions.delete(session[0]);
    }
  },
  async deleteSession(sessionId: string): Promise<void> {
    sessions.delete(sessionId);
  },
  async deleteUserSessions(userId: UserId): Promise<void> {
    for (let session of sessions.entries()) {
      if (session[1].userId !== userId) continue;
      sessions.delete(session[0]);
    }
  },
  async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    if (!sessions.has(sessionId)) {
      return [null, null];
    }
    const session = sessions.get(sessionId);
    if (!session) {
      return [null, null];
    }
    return [session.sessionDetails, session.user];
  },
  async getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
    const userSessions = [];
    for (let session of sessions.entries()) {
      if (session[1].userId !== userId) continue;
      userSessions.push(session[1].sessionDetails);
    }
    return userSessions;
  },
  async setSession(session: DatabaseSession): Promise<void> {
    sessions.set(session.id, {
      sessionDetails: session,
      userId: session.userId,
      user: userDetails(session.userId),
    });
  },
  async updateSessionExpiration(
    sessionId: string,
    expiresAt: Date,
  ): Promise<void> {},
};
