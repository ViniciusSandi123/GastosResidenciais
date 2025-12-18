import { useState, useEffect } from "react";
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

function SideBar({ isOpen, openSidebar }: SideBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setOpenMenu(null);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed top-[50px] left-0 h-[calc(100vh-50px)] bg-gray-200 p-2 transition-all duration-300 overflow-y-auto z-[1000] ${
        isOpen ? "w-[200px]" : "w-[50px]"
      }`}
    >
      <ul className="list-none p-0 m-0">
        <li className="my-2 relative">
          <button
            type="button"
            className={`w-full flex items-center font-bold text-gray-800 px-2 py-2 border-l-4 border-transparent transition-colors duration-200 hover:border-blue-600 hover:bg-gray-300 ${
              !isOpen ? "justify-center py-2" : ""
            }`}
            onClick={() => {
              if (!isOpen) {
                openSidebar();
                setOpenMenu("pessoas");
              } else {
                setOpenMenu(openMenu === "pessoas" ? null : "pessoas");
              }
            }}
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
            <ul className="fixed left-[200px] top-[118px] w-[180px] bg-gray-50 shadow-md border-l border-gray-300 py-1 z-[2000]">
              <li>
                <Link
                  to="/pessoas/listar"
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setOpenMenu(null)}
                >
                  Listagem de Pessoas cadastradas
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="my-2 relative">
          <button
            type="button"
            className={`w-full flex items-center font-bold text-gray-800 px-2 py-2 border-l-4 border-transparent transition-colors duration-200 hover:border-blue-600 hover:bg-gray-300 ${
              !isOpen ? "justify-center py-2" : ""
            }`}
            onClick={() => {
              if (!isOpen) {
                openSidebar();
                setOpenMenu("categorias");
              } else {
                setOpenMenu(openMenu === "categorias" ? null : "categorias");
              }
            }}
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
            <ul className="fixed left-[200px] top-[170px] w-[180px] bg-gray-50 shadow-md border-l border-gray-300 py-1 z-[2000]">
              <li>
                <Link
                  to="/categorias/listar"
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setOpenMenu(null)}
                >
                  Listagem de Categorias Cadastradas
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="my-2 relative">
          <button
            type="button"
            className={`w-full flex items-center font-bold text-gray-800 px-2 py-2 border-l-4 border-transparent transition-colors duration-200 hover:border-blue-600 hover:bg-gray-300 ${
              !isOpen ? "justify-center py-2" : ""
            }`}
            onClick={() => {
              if (!isOpen) {
                openSidebar();
                setOpenMenu("transacoes");
              } else {
                setOpenMenu(openMenu === "transacoes" ? null : "transacoes");
              }
            }}
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
            <ul className="fixed left-[200px] top-[220px] w-[180px] bg-gray-50 shadow-md border-l border-gray-300 py-1 z-[2000]">
              <li>
                <Link
                  to="/transacoes/listar"
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-200"
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
