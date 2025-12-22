import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  FolderIcon,
  CreditCardIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface SideBarProps {
  isOpen: boolean;
  openSidebar: () => void;
}

function SideBar({ isOpen }: SideBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuTop, setMenuTop] = useState(0);

  const pessoasRef = useRef<HTMLLIElement | null>(null);
  const categoriasRef = useRef<HTMLLIElement | null>(null);
  const transacoesRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setOpenMenu(null);
    }
  }, [isOpen]);

  const handleOpen = (
    menu: string,
    ref: React.RefObject<HTMLLIElement | null>
  ) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setMenuTop(rect.top);
    setOpenMenu(menu);
  };

  return (
    <div
      className={`fixed top-[50px] left-0 h-[calc(100vh-50px)] bg-gray-200 p-2 transition-all duration-300 overflow-y-auto z-[1000] ${
        isOpen ? "w-[200px]" : "w-[50px]"
      }`}
    >
      <ul className="list-none p-0 m-0">
        <li className="my-2 relative" ref={pessoasRef}>
          <button
            type="button"
            className={`w-full flex items-center font-bold text-gray-800 px-2 py-2 hover:bg-gray-300 ${
              !isOpen ? "justify-center" : ""
            }`}
            onClick={() => handleOpen("pessoas", pessoasRef)}
          >
            <UserIcon className="w-7 h-7 mr-2 shrink-0" />
            {isOpen && <span>Pessoas</span>}
            {isOpen && (
              <ChevronRightIcon
                className={`ml-auto w-4 transition-transform duration-200 ${
                  openMenu === "pessoas" ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {openMenu === "pessoas" && (
            <ul
              className="fixed left-[200px] w-[180px] bg-gray-50 shadow-md border border-gray-300 py-1 z-[2000]"
              style={{ top: menuTop }}
            >
              <li>
                <Link
                  to="/pessoas/listar"
                  className="block px-3 py-2 hover:bg-gray-200"
                  onClick={() => setOpenMenu(null)}
                >
                  Listagem de Pessoas
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="my-2 relative" ref={categoriasRef}>
          <button
            type="button"
            className={`w-full flex items-center font-bold text-gray-800 px-2 py-2 hover:bg-gray-300 ${
              !isOpen ? "justify-center" : ""
            }`}
            onClick={() => handleOpen("categorias", categoriasRef)}
          >
            <FolderIcon className="w-7 h-7 mr-2 shrink-0" />
            {isOpen && <span>Categorias</span>}
            {isOpen && (
              <ChevronRightIcon
                className={`ml-auto w-4 transition-transform duration-200 ${
                  openMenu === "categorias" ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {openMenu === "categorias" && (
            <ul
              className="fixed left-[200px] w-[180px] bg-gray-50 shadow-md border border-gray-300 py-1 z-[2000]"
              style={{ top: menuTop }}
            >
              <li>
                <Link
                  to="/categorias/listar"
                  className="block px-3 py-2 hover:bg-gray-200"
                  onClick={() => setOpenMenu(null)}
                >
                  Listagem de Categorias
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="my-2 relative" ref={transacoesRef}>
          <button
            type="button"
            className={`w-full flex items-center font-bold text-gray-800 px-2 py-2 hover:bg-gray-300 ${
              !isOpen ? "justify-center" : ""
            }`}
            onClick={() => handleOpen("transacoes", transacoesRef)}
          >
            <CreditCardIcon className="w-7 h-7 mr-2 shrink-0" />
            {isOpen && <span>Transações</span>}
            {isOpen && (
              <ChevronRightIcon
                className={`ml-auto w-4 transition-transform duration-200 ${
                  openMenu === "transacoes" ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {openMenu === "transacoes" && (
            <ul
              className="fixed left-[200px] w-[180px] bg-gray-50 shadow-md border border-gray-300 py-1 z-[2000]"
              style={{ top: menuTop }}
            >
              <li>
                <Link
                  to="/transacoes/listar"
                  className="block px-3 py-2 hover:bg-gray-200"
                  onClick={() => setOpenMenu(null)}
                >
                  Listagem de Transações
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
