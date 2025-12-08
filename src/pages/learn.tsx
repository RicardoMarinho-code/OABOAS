import { type NextPage } from "next";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  ActiveBookSvg,
  LockedBookSvg,
  CheckmarkSvg,
  FastForwardSvg,
  GoldenBookSvg,
  GoldenTrophySvg,
  LockSvg,
  StarSvg,
  LockedTrophySvg,
  UpArrowSvg,
  ActiveTrophySvg,
  PracticeExerciseSvg,
} from "~/components/Svgs";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { RightBar } from "~/components/RightBar";
import { LeftBar } from "~/components/LeftBar";
import { useRouter } from "next/router";
import { useBoundStore } from "~/hooks/useBoundStore";
import type {
  Module,
  QuestionBlock,
  QuestionBlockType,
} from "~/utils/oabModules";
import { modules } from "~/utils/oabModules";

type QuestionBlockStatus = "LOCKED" | "ACTIVE" | "COMPLETE";
 
const getQuestionBlockStatus = (
  questionBlock: QuestionBlock,
  lessonsCompleted: number,
): QuestionBlockStatus => {
  const lessonsPerTile = 4;
  const tilesCompleted = Math.floor(lessonsCompleted / lessonsPerTile);
  const allQuestionBlocks = modules.flatMap((m) =>
    m.questionBlocks.filter((qb) => qb.type !== "treasure" && qb.type !== "dumbbell"),
  );
  const tileIndex = allQuestionBlocks.findIndex((qb) => qb === questionBlock);

  if (tileIndex < tilesCompleted) {
    return "COMPLETE";
  }
  if (tileIndex > tilesCompleted) {
    return "LOCKED";
  }
  return "ACTIVE";
};

const QuestionBlockIcon = ({
  questionBlockType,
  status,
}: {
  questionBlockType: QuestionBlockType;
  status: QuestionBlockStatus;
}): JSX.Element => {
  switch (questionBlockType) {
    case "star":
      return status === "COMPLETE" ? (
        <CheckmarkSvg />
      ) : status === "ACTIVE" ? (
        <StarSvg />
      ) : (
        <LockSvg />
      );
    case "book":
      return status === "COMPLETE" ? (
        <GoldenBookSvg />
      ) : status === "ACTIVE" ? (
        <ActiveBookSvg />
      ) : (
        <LockedBookSvg />
      );
    case "fast-forward":
      return status === "COMPLETE" ? (
        <CheckmarkSvg />
      ) : status === "ACTIVE" ? (
        <StarSvg />
      ) : (
        <FastForwardSvg />
      );
    case "trophy":
      return status === "COMPLETE" ? (
        <GoldenTrophySvg />
      ) : status === "ACTIVE" ? (
        <ActiveTrophySvg />
      ) : (
        <LockedTrophySvg />
      );
  }
  // O tipo 'treasure' e 'dumbbell' foram removidos da exibição principal,
  // mas a lógica do ícone pode ser mantida se você decidir usá-los em outro lugar.
  return <></>;
  };

const ModuleSection = ({
  module,
}: {
  module: Module;
}): JSX.Element => {
  const router = useRouter();

  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);

  return (
    <>
      <ModuleHeader
        moduleNumber={module.moduleNumber}
        title={module.title}
        backgroundColor={module.backgroundColor}
      />
      <div className="mt-4 flex flex-col gap-4">
        {module.questionBlocks.map((questionBlock, i): JSX.Element => {
          if (questionBlock.type === "treasure" || questionBlock.type === "dumbbell") {
            return <Fragment key={i}></Fragment>;
          }
 
          const status = getQuestionBlockStatus(questionBlock, lessonsCompleted);

          const title = (() => {
            switch (questionBlock.type) {
              case "book":
              case "star":
                return questionBlock.title;
              case "fast-forward":
                return status === "LOCKED" ? "Pular para cá?" : questionBlock.title;
              case "trophy":
                return `Revisão do Módulo ${module.moduleNumber}`;
            }
          })();

          const colors = {
            LOCKED: {
              iconContainer: "bg-gray-200",
              icon: "text-gray-400",
              text: "text-gray-400",
              button: "bg-gray-200 text-gray-400 cursor-not-allowed",
              border: "border-gray-200",
            },
            ACTIVE: {
              iconContainer: module.backgroundColor,
              icon: "text-white",
              text: "text-gray-700",
              button: `${module.backgroundColor} text-white border-b-4 ${module.borderColor}`,
              border: module.borderColor,
            },
            COMPLETE: {
              iconContainer: "bg-yellow-400",
              icon: "text-white",
              text: "text-gray-700",
              button: "bg-white text-yellow-400 border-2 border-b-4 border-yellow-200",
              border: "border-yellow-400",
            },
          }[status];

          return (
            <div key={i} className={`flex items-center gap-4 rounded-2xl border-2 p-4 ${colors.border}`}>
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${colors.iconContainer}`}>
                <div className={colors.icon}>
                  <QuestionBlockIcon questionBlockType={questionBlock.type} status={status} />
                </div>
              </div>
              <div className="grow">
                <p className={`text-lg font-bold ${colors.text}`}>{title}</p>
              </div>
              <button
                onClick={() => status !== "LOCKED" && router.push("/lesson")}
                disabled={status === "LOCKED"}
                className={`rounded-2xl px-6 py-3 font-bold uppercase transition hover:brightness-110 ${colors.button}`}
              >
                {status === "COMPLETE" ? "Praticar" : "Iniciar"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

const getTopBarColors = (
  scrollY: number,
): {
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
} => {
  const defaultColors = {
    backgroundColor: "bg-oab-blue",
    borderColor: "border-blue-800",
  } as const;

  if (scrollY < 680) {
    return defaultColors;
  } else if (scrollY < 1830) {
    return modules[1] ?? defaultColors;
  } else {
    return modules[2] ?? defaultColors;
  }
};

const Learn: NextPage = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const updateScrollY = () => setScrollY(globalThis.scrollY ?? scrollY);
    updateScrollY();
    document.addEventListener("scroll", updateScrollY);

    return () => document.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  const topBarColors = getTopBarColors(scrollY);

  return (
    <>
      <TopBar
        backgroundColor={topBarColors.backgroundColor}
        borderColor={topBarColors.borderColor}
      />
      <LeftBar selectedTab="Learn" />

      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex max-w-2xl grow flex-col">
          {modules.map((module, i) => <ModuleSection module={module} key={i} />)}
          <div className="sticky bottom-28 left-0 right-0 flex items-end justify-between">
            {scrollY > 100 && (
              <button
                className="absolute right-4 flex h-14 w-14 items-center justify-center self-end rounded-2xl border-2 border-b-4 border-gray-200 bg-white transition hover:bg-gray-50 hover:brightness-90 md:right-0"
                onClick={() => scrollTo(0, 0)}
              >
                <span className="sr-only">Jump to top</span>
                <UpArrowSvg />
              </button>
            )}
          </div>
        </div>
        <RightBar />
      </div>

      <div className="pt-[90px]"></div>

      <BottomBar selectedTab="Learn" />
    </>
  );
};

export default Learn;

const ModuleHeader = ({
  moduleNumber,
  title,
  backgroundColor,
}: {
  moduleNumber: number;
  title: string;
  backgroundColor: `bg-${string}`;
}) => {
  return (
    <article
      className={["max-w-2xl text-white sm:rounded-xl", backgroundColor].join(
        " ",
      )}
    >
      <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Módulo {moduleNumber}</h2>
          <p className="text-lg">{title}</p>
        </div>
      </header>
    </article>
  );
};
