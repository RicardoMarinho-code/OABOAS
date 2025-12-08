import type { NextPage } from "next";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import {
  EditPencilSvg,
  EmptyFireSvg,
  FireSvg,
  LightningProgressSvg,
  EmptyMedalSvg,
  ProfileTimeJoinedSvg,
  SettingsGearSvg,
  StarSvg,
  CheckmarkSvg,
  GemSvg,
} from "~/components/Svgs";
import Link from "next/link";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { RightBar } from "~/components/RightBar";

const Profile: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileTopBar />
      <LeftBar selectedTab="Perfil" />
      <main className="mx-auto flex max-w-6xl justify-center gap-6 px-4 pt-20 pb-32 sm:px-6 md:ml-24 md:gap-10 md:pt-24 lg:ml-64">
        <div className="flex w-full max-w-4xl flex-col gap-6">
          <ProfileTopSection />
          <ProfileStatsSection />
          <ProfileFriendsSection />
        </div>
        <RightBar />
      </main>
      <BottomBar selectedTab="Perfil" />
    </div>
  );
};

export default Profile;

const ProfileTopBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <div className="invisible" aria-hidden={true}>
        <SettingsGearSvg />
      </div>
      <span className="text-gray-400">Perfil</span>
      <Link href="/settings/account">
        <SettingsGearSvg />
        <span className="sr-only">Configurações</span>
      </Link>
    </div>
  );
};

const ProfileTopSection = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const name = useBoundStore((x) => x.name);
  const username = useBoundStore((x) => x.username);
  const setName = useBoundStore((x) => x.setName);
  const setUsername = useBoundStore((x) => x.setUsername);
  const joinedAt = useBoundStore((x) => x.joinedAt).format("MMMM YYYY");
  const followingCount = 0;
  const followersCount = 0;

  const [localName, setLocalName] = useState(name);
  const [localUsername, setLocalUsername] = useState(username);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  useEffect(() => setLocalName(name), [name]);
  useEffect(() => setLocalUsername(username), [username]);

  const handleBlur = (field: "name" | "username") => {
    if (field === "name") {
      setName(localName.trim());
    } else {
      setUsername(localUsername.trim());
    }
  };

  const levelBadge = "Nível Bronze";

  return (
    <section className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-3xl font-bold text-gray-400 md:h-24 md:w-24">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col gap-2">
            <div className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              <div className="h-3.5 w-3.5">
                <StarSvg />
              </div>
              <span>{levelBadge}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ProfileTimeJoinedSvg />
              <span>{`Entrou em ${joinedAt}`}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="h-4 w-4">
                <GemSvg />
              </div>
              <span>{`${followingCount} seguindo · ${followersCount} seguidores`}</span>
            </div>
          </div>
        </div>
        <Link
          href="/settings/account"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-oab-blue px-5 py-3 font-bold uppercase text-white transition hover:brightness-110"
        >
          <EditPencilSvg />
          Editar no app
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ProfileEditableField
            label="Nome completo"
            value={localName}
            onChange={setLocalName}
            onBlur={() => handleBlur("name")}
          />
        <ProfileEditableField
          label="Nome de usuário"
          value={localUsername}
          onChange={setLocalUsername}
          onBlur={() => handleBlur("username")}
          prefix="@"
        />
      </div>
    </section>
  );
};

const ProfileStatsSection = () => {
  const streak = useBoundStore((x) => x.streak);
  const xpByDate = useBoundStore((x) => x.xpByDate);
  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);
  const goalXp = useBoundStore((x) => x.goalXp);
  const xpThisWeek = useBoundStore((x) => x.xpThisWeek());

  const totalXp = useMemo(
    () => Object.values(xpByDate).reduce((acc: number, value: number) => acc + value, 0),
    [xpByDate],
  );

  const level = Math.max(1, Math.floor(lessonsCompleted / 10) + 1);
  const nivelLabel = `Nível ${level}`;

  const stats = [
    {
      label: "Dias de sequência",
      value: streak,
      icon: streak === 0 ? <EmptyFireSvg /> : <FireSvg />,
      helper: "Mantenha o ritmo diário",
      progress: Math.min(100, (streak / 30) * 100),
      color: "bg-red-100 text-red-600"
    },
    {
      label: "XP total",
      value: totalXp,
      icon: <LightningProgressSvg size={24} />,
      helper: `${xpThisWeek} XP nesta semana`,
      progress: Math.min(100, (totalXp / 10000) * 100),
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      label: "Nível atual",
      value: nivelLabel,
      icon: <div className="h-6 w-6 text-blue-500"><CheckmarkSvg /></div>,
      helper: `Progresso: ${(lessonsCompleted % 10) * 10}%`,
      progress: (lessonsCompleted % 10) * 10,
      color: "bg-blue-100 text-blue-600"
    },
    {
      label: "Módulos concluídos",
      value: Math.floor(lessonsCompleted / 10),
      icon: <div className="h-6 w-6 text-green-500"><EditPencilSvg /></div>,
      helper: `Total de ${Math.ceil(lessonsCompleted / 10) * 10} módulos`,
      progress: (lessonsCompleted / 100) * 100,
      color: "bg-green-100 text-green-600"
    },
  ];

  return (
    <section className="rounded-3xl border border-white/70 bg-white/95 p-5 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Estatísticas</h2>
        <span className="text-sm text-gray-500">Atualizado automaticamente</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color} bg-opacity-20`}>
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {stat.label}
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
            </div>
            <div className="mt-1">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-gray-500">{stat.helper}</span>
                <span className="font-medium">{Math.round(stat.progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const ProfileEditableField = ({
  label,
  value,
  onChange,
  onBlur,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  prefix?: string;
}) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
      {label}
      <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus-within:border-oab-blue">
        {prefix ? <span className="mr-2 text-gray-400">{prefix}</span> : null}
        <input
          className="w-full bg-transparent text-base font-semibold text-gray-900 placeholder-gray-400 outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={label}
        />
      </div>
    </label>
  );
};

const ProfileFriendsSection = () => {
  return (
    <section className="mt-6">
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Seu Progresso</h2>
        <p className="mb-6 text-gray-600">
          Continue estudando para subir de nível e desbloquear novos módulos do curso preparatório para a OAB.
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-gray-700">Módulo Atual: Ética Profissional</span>
              <span className="font-semibold text-blue-600">45%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                style={{ width: '45%' }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-2">
                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Próximo objetivo</p>
                <p className="text-xs text-gray-500">50 questões respondidas</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-blue-600">30/50</span>
          </div>
        </div>
      </div>
    </section>
  );
};
