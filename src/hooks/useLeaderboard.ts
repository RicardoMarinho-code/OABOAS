import { fakeUsers } from "~/utils/fakeUsers";
// import { useBoundStore } from "~/hooks/useBoundStore";

export const useLeaderboardUsers = () => {
  // const xpThisWeek = useBoundStore((x) => x.xpThisWeek());
  // const name = useBoundStore((x) => x.name);
  // const userInfo = {
  //   name,
  //   xp: xpThisWeek,
  //   isCurrentUser: true,
  // } as const;
  return [...fakeUsers].sort((a, b) => (b.xp || 0) - (a.xp || 0));
};

export const useLeaderboardRank = () => {
  const leaderboardUsers = useLeaderboardUsers();
  const index = leaderboardUsers.findIndex((user) => user.isCurrentUser);
  return index === -1 ? null : index + 1;
};
