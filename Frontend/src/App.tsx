import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import routes from "./routes";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="flex flex-col h-screen font-sans">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 w-full min-h-0">
          <SideBar
            isOpen={sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
          <div
            className={`flex-1 mt-[50px] overflow-y-auto p-5 bg-gray-100 transition-[margin-left] duration-300 ease-in-out ${
              sidebarOpen ? "ml-[200px]" : "ml-[50px]"
            }`}
          >
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
