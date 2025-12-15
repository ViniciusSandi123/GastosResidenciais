import "./NavBar.css";

interface NavBarProps {
  toggleSidebar: () => void;
}

function NavBar({ toggleSidebar }: NavBarProps) {
  return (
    <div className="navbar">
      <h2 className="navbar-logo cursor-pointer" onClick={toggleSidebar}>
        Gastos Residenciais
      </h2>
    </div>
  );
}

export default NavBar;
