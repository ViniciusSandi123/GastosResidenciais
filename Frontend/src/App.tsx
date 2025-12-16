import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Home from "./pages/HomePage";
import Pessoas from "./pages/Pessoas";
import Categorias from "./pages/Categorias";
import Transacoes from "./pages/Transacoes";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="App">
        <NavBar toggleSidebar={toggleSidebar} />
        <div className="App-body">
          <SideBar isOpen={sidebarOpen} />
          <div className={`App-content ${sidebarOpen ? "" : "collapsed"}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pessoas" element={<Pessoas />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/transacoes" element={<Transacoes />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
