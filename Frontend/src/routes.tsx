import HomePage from "./pages/HomePage/HomePage";
import ListagemPessoas from "./pages/Pessoas/ListagemPessoas";
import ListagemCategorias from "./pages/Categorias/ListagemCategorias";
import ListagemTransacoes from "./pages/Transacoes/ListagemTransacoes";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/pessoas/listar", element: <ListagemPessoas /> },
  { path: "/categorias/listar", element: <ListagemCategorias /> },
  { path: "/transacoes/listar", element: <ListagemTransacoes /> },
];

export default routes;
