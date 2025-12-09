import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useEffect, useMemo, useState } from "react";
import type { Tab } from "./BottomBar";
import { useBottomBarItems } from "./BottomBar";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";

const LeftBarMoreMenuSvg = (props: ComponentProps<"svg">) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LeftBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const router = useRouter();  
  const loggedIn = useBoundStore((s) => s.loggedIn);
  const userType = useBoundStore((s) => s.userType);
  const logIn = useBoundStore((s) => s.logIn);
  const logOut = useBoundStore((s) => s.logOut);

  const [moreMenuShown, setMoreMenuShown] = useState(false);
  const [loginScreenState, setLoginScreenState] = useState<LoginScreenState>("HIDDEN");

  const bottomBarItems = useBottomBarItems();

  const logoText = useMemo(() => {
    if (!loggedIn) {
      return "";
    }
    return userType === 'comunidade' ? "Comunidade" : "GP Estudos";
  }, [loggedIn, userType]);


  // Fechar o menu ao mudar de rota
  useEffect(() => {
    const handleRouteChange = () => {      
      setMoreMenuShown(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;      
      if (moreMenuShown && !target.closest('.more-menu-container')) {
        setMoreMenuShown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreMenuShown]);

  return (
    <>
      <nav className="left-bar-container fixed bottom-0 left-0 top-0 hidden flex-col gap-5 border-r-2 border-[#e5e5e5] bg-white p-3 md:flex lg:w-64 lg:p-5">
        <Link
          href="/learn"
          className="mb-5 ml-5 mt-5 hidden text-3xl font-bold text-oab-blue lg:block transition-all"
        >
          {logoText}
        </Link>
        
        {loggedIn && (
          <div className={`mb-4 ml-5 hidden rounded-lg p-3 text-white lg:block ${
            userType === 'comunidade' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
              : 'bg-gradient-to-r from-gray-500 to-gray-700'
          }`}>
            <div className="text-xs font-medium uppercase tracking-wide opacity-90">
              {userType === 'comunidade' ? 'Plano Premium' : 'Plano Free'}
            </div>
            <div className="text-sm font-bold">
              Bem-vindo{userType === 'comunidade' ? ' ao plano Premium!' : ' ao plano Free!'}
            </div>
          </div>
        )}
        
        <ul className="flex flex-col items-stretch gap-1">
          {bottomBarItems.map((item) => {
            const isActive = item.name === selectedTab;
            return (
              <li key={item.href} className="flex flex-1">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors lg:w-full lg:justify-start ${
                    isActive
                      ? "bg-oab-blue/10 text-oab-blue font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setMoreMenuShown(false)}
                >
                  <span className="flex h-6 w-6 items-center justify-center">
                    {item.icon}
                  </span>
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Menu Mais */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div
            className="relative more-menu-container"
            onMouseEnter={() => setMoreMenuShown(true)}
            onMouseLeave={() => setMoreMenuShown(false)}
          >
            <button
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                moreMenuShown
                  ? "bg-gray-100 text-oab-blue"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setMoreMenuShown(!moreMenuShown)}
              aria-expanded={moreMenuShown}
              aria-haspopup="true"
            >
              <LeftBarMoreMenuSvg className="h-6 w-6" />
              <span className="hidden lg:inline">Mais</span>
            </button>

            {moreMenuShown && (
              <div
                className="absolute bottom-full left-0 mb-2 w-full min-w-[200px] rounded-xl border border-gray-200 bg-white py-2 shadow-lg md:bottom-auto md:left-full md:top-0 md:ml-2 md:mb-0"
                role="menu"
              >
                {!loggedIn ? ( // Se não estiver logado
                  <>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setLoginScreenState("SIGNUP");
                        setMoreMenuShown(false);
                      }}
                      role="menuitem"
                    >
                      Criar um perfil
                    </button>
                    <Link
                      href="/settings/sound"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => {
                        setMoreMenuShown(false);                        
                      }}
                    >
                      Configurações
                    </Link>
                    <button
                      onClick={() => {
                        setLoginScreenState("LOGIN");
                        setMoreMenuShown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Entrar
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/settings/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => {
                        setMoreMenuShown(false);                        
                      }}
                    >
                      Configurações
                    </Link>
                    <Link
                      href="/settings/help"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => {
                        setMoreMenuShown(false);                        
                      }}
                    >
                      Ajuda
                    </Link>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        logOut();
                        setMoreMenuShown(false);
                        void router.push("/");
                      }}
                      role="menuitem"
                    >
                      Sair
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};
