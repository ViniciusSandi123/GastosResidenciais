interface NavBarProps {
  toggleSidebar: () => void;
}

function NavBar({ toggleSidebar }: NavBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[50px] bg-blue-600 text-white flex items-center px-5 z-[1000]">
      <h2
        className="text-[1.2rem] font-bold cursor-pointer"
        onClick={toggleSidebar}
      >
        Gastos Residenciais
      </h2>
    </div>
  );
}

export default NavBar;
