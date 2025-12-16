import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import CadastroPessoas from "./pages/Pessoas/CadastroPessoas";
import ListagemPessoas from "./pages/Pessoas/ListagemPessoas";
import CadastroCategorias from "./pages/Categorias/CadastroCategorias";
import ListagemCategorias from "./pages/Categorias/ListagemCategorias";
import ListagemTransacoes from "./pages/Transacoes/ListagemTransacoes";
import "./App.css";

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
              <Route path="/" element={<HomePage />} />
              <Route path="/pessoas/cadastrar" element={<CadastroPessoas />} />
              <Route path="/pessoas/listar" element={<ListagemPessoas />} />
              <Route
                path="/categorias/cadastrar"
                element={<CadastroCategorias />}
              />
              <Route
                path="/categorias/listar"
                element={<ListagemCategorias />}
              />
              <Route
                path="/transacoes/listar"
                element={<ListagemTransacoes />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
