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
    <div
      className="sidebar"
      style={{
        width: isOpen ? "200px" : "50px", // toggle largura
        transition: "width 0.3s",
      }}
    >
      <ul>
        <li>
          <Link to="/" title="Home">
            <HomeIcon className="w-5 h-5 inline-block mr-2" />
            {isOpen && "Home"}
          </Link>
        </li>
        <li>
          <Link to="/pessoas" title="Pessoas">
            <UserIcon className="w-5 h-5 inline-block mr-2" />
            {isOpen && "Pessoas"}
          </Link>
        </li>
        <li>
          <Link to="/categorias" title="Categorias">
            <FolderIcon className="w-5 h-5 inline-block mr-2" />
            {isOpen && "Categorias"}
          </Link>
        </li>
        <li>
          <Link to="/transacoes" title="Transações">
            <CreditCardIcon className="w-5 h-5 inline-block mr-2" />
            {isOpen && "Transações"}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
