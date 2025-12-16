import HomePage from "./pages/HomePage/HomePage";
import CadastroPessoas from "./pages/Pessoas/CadastroPessoas";
import ListagemPessoas from "./pages/Pessoas/ListagemPessoas";
import CadastroCategorias from "./pages/Categorias/CadastroCategorias";
import ListagemCategorias from "./pages/Categorias/ListagemCategorias";
import ListagemTransacoes from "./pages/Transacoes/ListagemTransacoes";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/pessoas/cadastrar", element: <CadastroPessoas /> },
  { path: "/pessoas/listar", element: <ListagemPessoas /> },
  { path: "/categorias/cadastrar", element: <CadastroCategorias /> },
  { path: "/categorias/listar", element: <ListagemCategorias /> },
  { path: "/transacoes/listar", element: <ListagemTransacoes /> },
];

export default routes;
