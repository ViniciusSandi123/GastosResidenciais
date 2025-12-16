import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import "./styles/App.css";
import routes from "./routes";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="App">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="App-body">
          <SideBar
            isOpen={sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
          <div className={`App-content ${sidebarOpen ? "" : "collapsed"}`}>
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
