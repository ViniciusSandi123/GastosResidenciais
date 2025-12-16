import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  FolderIcon,
  CreditCardIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import "./SideBar.css";

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
    <div className={`sidebar ${isOpen ? "" : "sidebar-close"}`}>
      <ul>
        <li className="sidebar-item">
          <Link
            to="/"
            title="Home"
            className={isOpen ? "sidebar-link" : "sidebar-link collapsed"}
            onClick={() => {
              openSidebar();
              setOpenMenu(null);
            }}
          >
            <HomeIcon />
            {isOpen && <span>Home</span>}
          </Link>
        </li>

        <li className="sidebar-item">
          <button
            type="button"
            className={`sidebar-link ${!isOpen ? "collapsed" : ""}`}
            onClick={() => {
              if (!isOpen) {
                openSidebar();
                setOpenMenu("pessoas");
              } else {
                setOpenMenu(openMenu === "pessoas" ? null : "pessoas");
              }
            }}
          >
            <UserIcon />
            {isOpen && <span>Pessoas</span>}
            {isOpen && (
              <ChevronRightIcon
                className={`chevron ${openMenu === "pessoas" ? "open" : ""}`}
              />
            )}
          </button>

          {openMenu === "pessoas" && (
            <ul className="submenu submenu-pessoas">
              <li>
                <Link to="/pessoas/cadastrar" onClick={() => setOpenMenu(null)}>
                  Cadastro de Pessoas
                </Link>
              </li>
              <li>
                <Link to="/pessoas/listar" onClick={() => setOpenMenu(null)}>
                  Listagem de Pessoas cadastradas
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar-item">
          <button
            type="button"
            className={`sidebar-link ${!isOpen ? "collapsed" : ""}`}
            onClick={() => {
              if (!isOpen) {
                openSidebar();
                setOpenMenu("categorias");
              } else {
                setOpenMenu(openMenu === "categorias" ? null : "categorias");
              }
            }}
          >
            <FolderIcon />
            {isOpen && <span>Categorias</span>}
            {isOpen && (
              <ChevronRightIcon
                className={`chevron ${openMenu === "categorias" ? "open" : ""}`}
              />
            )}
          </button>

          {openMenu === "categorias" && (
            <ul className="submenu submenu-categorias">
              <li>
                <Link
                  to="/categorias/cadastrar"
                  onClick={() => setOpenMenu(null)}
                >
                  Cadastro de Categorias
                </Link>
              </li>
              <li>
                <Link to="/categorias/listar" onClick={() => setOpenMenu(null)}>
                  Listagem de Categorias Cadastradas
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar-item">
          <button
            type="button"
            className={`sidebar-link ${!isOpen ? "collapsed" : ""}`}
            onClick={() => {
              if (!isOpen) {
                openSidebar();
                setOpenMenu("transacoes");
              } else {
                setOpenMenu(openMenu === "transacoes" ? null : "transacoes");
              }
            }}
          >
            <CreditCardIcon />
            {isOpen && <span>Transações</span>}
            {isOpen && (
              <ChevronRightIcon
                className={`chevron ${openMenu === "transacoes" ? "open" : ""}`}
              />
            )}
          </button>

          {openMenu === "transacoes" && (
            <ul className="submenu submenu-transacoes">
              <li>
                <Link to="/transacoes/listar" onClick={() => setOpenMenu(null)}>
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
