import type { NextPage } from "next";
import React, { useMemo, useEffect } from "react";
import { LeftBar } from "~/components/LeftBar";
import { BottomBar } from "~/components/BottomBar";
import { useBoundStore } from "~/hooks/useBoundStore";
import Link from "next/link";
import {
  BronzeLeagueSvg,
  LeaderboardBannerSvg,
  LeaderboardExplanationSvg,
  LockedLeaderboardSvg,
} from "~/components/Svgs";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useLeaderboardRank, useLeaderboardUsers } from "~/hooks/useLeaderboard";
import { TopBar } from "~/components/TopBar";
import { RightBar } from "~/components/RightBar";

const LeaderboardExplanationSection = () => {
  return (
    <article className="relative hidden h-fit w-96 shrink-0 gap-5 rounded-2xl border-2 border-gray-200 p-6 xl:flex">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold uppercase text-gray-400">
          What are leaderboards?
        </h2>
        <p className="font-bold text-gray-700">Do lessons. Ganhe XP. Compete.</p>
        <p className="text-gray-400">
          Ganhe XP through lessons, then compete with players in a weekly
          leaderboard
        </p>
      </div>

      <div className="w-10 shrink-0"></div>

      <LeaderboardExplanationSvg />
    </article>
  );
};

type TimeLeftUnit = "days" | "hours" | "minutes";

const timeUntilStartOfWeek = (units: TimeLeftUnit): number => {
  const startOfWeekDay = 0;
  const startOfWeekHour = 20;
  const daysAhead =
    dayjs().day() === startOfWeekDay && dayjs().hour() < startOfWeekHour
      ? 0
      : 7 - dayjs().day();
  const startOfWeek = dayjs()
    .startOf("day")
    .add(startOfWeekHour, "hours")
    .add(daysAhead, "day");
  return startOfWeek.diff(dayjs(), units);
};

const timeLeft = (): string => {
  if (timeUntilStartOfWeek("days") > 0) {
    const days = timeUntilStartOfWeek("days");
    return `${days} dia${days > 1 ? "s" : ""}`;
  }
  if (timeUntilStartOfWeek("hours") > 0) {
    const hours = timeUntilStartOfWeek("hours");
    return `${hours} hora${hours > 1 ? "s" : ""}`;
  }
  const minutes = timeUntilStartOfWeek("minutes");
  return `${minutes} minuto${minutes > 1 ? "s" : ""}`;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

const LeaderboardProfile = ({
  place,
  name,
  xp,
  isCurrentUser,
}: {
  place: number;
  name: string;
  xp: number;
  isCurrentUser: boolean;
}) => {
  return (
    <div
      className={[
        "flex items-center gap-4 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        isCurrentUser ? "ring-2 ring-oab-blue" : "",
      ].join(" ")}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-oab-blue">
        #{place}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-oab-blue/10 text-base font-bold text-oab-blue">
        {getInitials(name)}
      </div>
      <div className="flex grow flex-col">
        <span className="font-semibold text-gray-900">{name}</span>
        <span className="text-xs text-gray-500">
          {isCurrentUser ? "Seu progresso semanal" : "Simulado nacional"}
        </span>
      </div>
      <div className="text-right font-semibold text-gray-900">
        {xp} <span className="text-xs font-normal text-gray-500">XP</span>
      </div>
    </div>
  );
};

const PodiumCard = ({
  position,
  name,
  xp,
}: {
  position: number;
  name: string;
  xp: number;
}) => {
  const palettes: Record<number, string> = {
    1: "bg-yellow-50 border-yellow-200",
    2: "bg-gray-100 border-gray-200",
    3: "bg-orange-50 border-orange-200",
  };
  return (
    <article
      className={`flex flex-col items-center rounded-3xl border ${palettes[position]} p-5 text-center shadow-sm`}
    >
      <div className="text-xs uppercase tracking-[0.3em] text-gray-400">
        #{position}
      </div>
      <div className="mt-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-oab-blue">
        {getInitials(name)}
      </div>
      <h3 className="mt-3 text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">Simulado Nacional</p>
      <strong className="mt-4 text-2xl text-oab-blue">{xp} XP</strong>
    </article>
  );
};

const Leaderboard: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const xpThisWeek = useBoundStore((x) => x.xpThisWeek());
  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  const lessonsToUnlockLeaderboard = 10;
  const lessonsRemainingToUnlockLeaderboard =
    lessonsToUnlockLeaderboard - lessonsCompleted;
  const leaderboardIsUnlocked = lessonsCompleted >= lessonsToUnlockLeaderboard;

  const leaderboardLeague = "Bronze League";

  const leaderboardUsers = useLeaderboardUsers();
  const leaderboardRank = useLeaderboardRank();
  const podiumUsers = leaderboardUsers.slice(0, 3);
  const remainingUsers = leaderboardUsers.slice(3);
  const podiumOrder = useMemo(() => {
    if (podiumUsers.length < 3) return podiumUsers;
    return [podiumUsers[1], podiumUsers[0], podiumUsers[2]];
  }, [podiumUsers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <LeftBar selectedTab="Ranking" />
      <main className="mx-auto flex max-w-6xl justify-center gap-6 px-4 pt-20 pb-32 sm:px-6 md:ml-24 md:gap-10 md:pt-24 lg:ml-64">
        <div className="flex w-full max-w-3xl flex-col gap-6">
          {!leaderboardIsUnlocked ? (
            <section className="rounded-3xl border border-white/70 bg-white/95 p-6 text-center shadow-sm">
              <LeaderboardBannerSvg className="mx-auto h-32 w-auto" />
              <h1 className="mt-6 text-3xl font-bold text-gray-900">
                Desbloqueie os Rankings
              </h1>
              <p className="mt-3 text-sm text-gray-500">
                Complete {lessonsRemainingToUnlockLeaderboard} lição
                {lessonsRemainingToUnlockLeaderboard === 1 ? "" : "s"} para
                liberar o ranking semanal do simulado.
              </p>
              <Link
                href="/lesson?practice"
                className="mt-6 inline-flex w-full justify-center rounded-2xl border border-blue-200 bg-oab-blue px-6 py-3 font-bold uppercase text-white transition hover:brightness-110 sm:w-auto"
              >
                Fazer uma lição
              </Link>
              <div className="mt-6">
                <LockedLeaderboardSvg className="mx-auto h-24 w-auto" />
              </div>
            </section>
          ) : (
            <>
              <section className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-sm backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-blue-500">
                      Ranking semanal
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-gray-900">
                      {leaderboardLeague}
                    </h1>
                    <p className="text-sm text-gray-500">
                      Dispute com a comunidade e avance de liga toda semana.
                    </p>
                  </div>
                  <BronzeLeagueSvg className="h-24 w-24" />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <p className="text-xs uppercase text-gray-400">Sua posição</p>
                    <p className="mt-1 text-3xl font-bold text-oab-blue">
                      {leaderboardRank ? `#${leaderboardRank}` : "--"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Atualizado em tempo real
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <p className="text-xs uppercase text-gray-400">XP na semana</p>
                    <p className="mt-1 text-3xl font-bold text-oab-blue">
                      {xpThisWeek} XP
                    </p>
                    <p className="text-sm text-gray-500">
                      Termine o simulado para somar mais pontos
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="rounded-full border border-gray-200 px-3 py-1">
                    Top 20 sobe de liga
                  </span>
                  <span className="rounded-full border border-gray-200 px-3 py-1">
                    Termina em {timeLeft()}
                  </span>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                {podiumOrder.map((user, index) =>
                  user ? (
                    <PodiumCard
                      key={user.name}
                      position={index === 1 ? 1 : index === 0 ? 2 : 3}
                      name={user.name}
                      xp={user.xp || 0}
                    />
                  ) : null,
                )}
              </section>

              <section className="space-y-3 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Classificação
                    </p>
                    <h2 className="text-xl font-bold text-gray-900">
                      Lista completa
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500">
                    {leaderboardUsers.length} participantes
                  </span>
                </div>
                {remainingUsers.map((user, index) => (
                  <LeaderboardProfile
                    key={user.name}
                    place={index + 4}
                    name={user.name}
                    xp={user.xp || 0}
                    isCurrentUser={user.isCurrentUser}
                  />
                ))}
              </section>
            </>
          )}
        </div>
        {!leaderboardIsUnlocked && <LeaderboardExplanationSection />}
        <RightBar />
      </main>
      <BottomBar selectedTab="Ranking" />
    </div>
  );
};

export default Leaderboard;
