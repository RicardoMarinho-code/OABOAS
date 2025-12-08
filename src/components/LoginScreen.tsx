import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { CloseSvg } from "./Svgs";

export type LoginScreenState = "HIDDEN" | "LOGIN" | "SIGNUP";

export const LoginScreen = ({
  loginScreenState,
  setLoginScreenState,
}: {
  loginScreenState: LoginScreenState;
  setLoginScreenState: React.Dispatch<React.SetStateAction<LoginScreenState>>;
}) => {
  const logIn = useBoundStore((s) => s.logIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = logIn(email, password);
    if (success) {
      setLoginScreenState("HIDDEN");
      setEmail("");
      setPassword("");
    } else {
      setError("E-mail ou senha inválidos.");
    }
  };

  if (loginScreenState === "HIDDEN") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setLoginScreenState("HIDDEN")}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setLoginScreenState("HIDDEN")}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
        >
          <CloseSvg />
        </button>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {loginScreenState === "LOGIN" ? "Entrar" : "Criar um perfil"}
        </h2>

        {loginScreenState === "LOGIN" ? (
          <form onSubmit={handleLogin}>
            {error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-oab-blue focus:outline-none focus:ring-1 focus:ring-oab-blue"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-oab-blue focus:outline-none focus:ring-1 focus:ring-oab-blue"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-oab-blue py-3 font-bold text-white transition hover:bg-oab-blue/90"
            >
              Entrar
            </button>
          </form>
        ) : (
          // Formulário de SIGNUP pode ser adicionado aqui
          <div className="text-center">
            <p className="text-gray-600">
              Funcionalidade de criação de perfil em breve!
            </p>
            <button
              onClick={() => setLoginScreenState("LOGIN")}
              className="mt-4 text-sm font-semibold text-oab-blue hover:underline"
            >
              Já tem uma conta? Entre aqui.
            </button>
          </div>
        )}
      </div>
    </div>
  );
};