import type { NextPage } from "next";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";

const bgSnow = _bgSnow as StaticImageData;

const Register: NextPage = () => {  
  return (
    <main
      className="flex min-h-screen flex-col items-center bg-[#235390] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <div className="container flex grow flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-white">
          Crie sua conta
        </h1>
        <p className="text-center text-lg text-gray-200">
          O formulário de registro será implementado aqui.
        </p>
      </div>
    </main>
  );
};

export default Register;
