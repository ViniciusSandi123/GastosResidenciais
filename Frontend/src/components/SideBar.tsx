import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  FolderIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import "./SideBar.css";

interface SideBarProps {
  isOpen: boolean;
}

function SideBar({ isOpen }: SideBarProps) {
  return (
    <div className={`sidebar ${isOpen ? "" : "sidebar-close"}`}>
      <ul>
        <li>
          <Link
            to="/"
            title="Home"
            className={isOpen ? "sidebar-link" : "sidebar-link collapsed"}
          >
            <HomeIcon />
            {isOpen && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/pessoas"
            title="Pessoas"
            className={isOpen ? "sidebar-link" : "sidebar-link collapsed"}
          >
            <UserIcon className="w-5 h-5 inline-block mr-2" />
            {isOpen && <span>Pessoas</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/categorias"
            title="Categorias"
            className={isOpen ? "sidebar-link" : "sidebar-link collapsed"}
          >
            <FolderIcon className="w-5 h-5 inline-block mr-2" />
            {isOpen && <span>Pessoas</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/transacoes"
            title="Transações"
            className={isOpen ? "sidebar-link" : "sidebar-link collapsed"}
          >
            <CreditCardIcon className="w-5 h-5 inline-block mr-2" />
            {isOpen && <span>Pessoas</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
