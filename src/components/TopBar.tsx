import React from "react";

type TopBarProps = {
  backgroundColor?: string;
  borderColor?: string;
};

export const TopBar = ({
  backgroundColor = "bg-oab-blue",
  borderColor = "border-blue-800",
}: TopBarProps) => {
  return (
    <header
    >
      <div className="flex w-full items-center justify-between">
        {/* O logo que aparece em telas menores pode ser adicionado aqui se necessário */}
        <div className="text-lg font-bold text-white">
          {/* Placeholder para itens da barra superior */}
        </div>
      </div>
    </header>
  );
};