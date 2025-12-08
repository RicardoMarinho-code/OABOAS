import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const RecuperarSenha: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="flex w-full grow flex-col items-center gap-5 px-5 pt-28 sm:w-96 sm:pt-40">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Recuperar senha
        </h1>
        <p className="text-center text-gray-700">
          Enviaremos instruções sobre como redefinir sua senha por e-mail ou
          SMS.
        </p>
        <div className="flex w-full flex-col gap-3">
          <input
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3"
            placeholder="E-mail ou celular"
          />
          <button className="w-full rounded-2xl border-b-4 border-oab-blue-dark bg-oab-blue py-3 font-bold uppercase text-white transition hover:brightness-110">
            Enviar
          </button>
        </div>
        <Link
          href="/?login"
          className="font-bold uppercase text-oab-blue hover:brightness-110"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
};

export default RecuperarSenha;