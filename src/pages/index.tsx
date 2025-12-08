import { type NextPage } from "next";
import React, { useEffect, useState } from "react";
import { LoginScreen, type LoginScreenState } from "~/components/LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");
  const [isMounted, setIsMounted] = useState(false);
  const loggedIn = useBoundStore((s) => s.loggedIn);
  const router = useRouter();

  useEffect(() => {
    // Adiciona um pequeno atraso para garantir que a transição seja visível
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      void router.push("/learn");
    }
  }, [loggedIn, router]);

  const onLogin = () => setLoginScreenState("LOGIN");
  const onSignup = () => setLoginScreenState("SIGNUP");

  return (
    <>
      <div className="grid min-h-screen md:grid-cols-2">
        <main className="flex flex-col items-center justify-center bg-gradient-to-br from-oab-blue to-blue-800 p-8 text-white">
          <div className="w-full max-w-md space-y-6 text-center md:text-left">
            <h1
              className={`transform-gpu text-4xl font-extrabold tracking-tight transition-all duration-700 ease-out md:text-5xl lg:text-6xl ${
                isMounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Plataforma <span className="text-oab-red">OAB</span>
            </h1>
            <p
              className={`transform-gpu text-lg text-blue-100 transition-all duration-700 ease-out md:text-xl ${
                isMounted
                  ? "translate-y-0 opacity-100 delay-200"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Sua jornada para a aprovação começa aqui. Estude de forma
              inteligente e gamificada.
            </p>
          </div>
        </main>

        <aside className="flex flex-col items-center justify-center bg-gray-50 p-8 transition-all duration-500">
          <div className="w-full max-w-xs space-y-6">
            <h2
              className={`transform-gpu text-center text-3xl font-bold text-gray-800 transition-all duration-700 ease-out ${
                isMounted
                  ? "translate-y-0 opacity-100 delay-300"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Bem-vindo!
            </h2>
            <div
              className={`transform-gpu flex flex-col gap-4 transition-all duration-700 ease-out ${
                isMounted
                  ? "translate-y-0 opacity-100 delay-500"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <button
                className="w-full transform-gpu rounded-2xl border-b-4 border-oab-blue-dark bg-oab-blue py-3 font-bold uppercase text-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
                onClick={onSignup}
              >
                Criar conta
              </button>
              <button
                className="w-full transform-gpu rounded-2xl border-2 border-b-4 border-gray-300 bg-white py-3 font-bold uppercase text-oab-blue shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-gray-100 hover:shadow-lg"
                onClick={onLogin}
              >
                Já tenho uma conta
              </button>
            </div>
          </div>
        </aside>
      </div>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};

export default Home;
