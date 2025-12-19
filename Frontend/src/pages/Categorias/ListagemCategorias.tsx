import { useState, useEffect } from "react";
import CadastroCategoriasModal from "./CadastroCategoriasModal";
import Paginacao from "../../components/Paginacao";

interface Categoria {
  id: number;
  descricao: string;
  finalidade: number;
  finalidadeDescricao: string;
}

interface ApiResponseCategorias {
  items: Categoria[];
  total: number;
  page: number;
  pageSize: number;
}

function ListagemCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch(
          `http://localhost:5144/api/Categoria?page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error(
            `Erro ao buscar as Categorias cadastradas: ${response.statusText}`
          );
        }
        const data: ApiResponseCategorias = await response.json();

        setCategorias(Array.isArray(data.items) ? data.items : []);
        setTotal(data.total ?? 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, [page, pageSize]);

  async function handleAdicionarCategoria(
    descricao: string,
    finalidade: number
  ) {
    try {
      const response = await fetch(
        `http://localhost:5144/api/Categoria?page=${page}&pageSize=${pageSize}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ descricao, finalidade }),
        }
      );

      if (response.status === 201) {
        setMensagem("Categoria adicionada com sucesso!");
      } else if (response.status === 400) {
        const data = await response.json();
        const mensagens = Object.values(data.errors).flat().join(", ");
        setMensagem(`Erro: ${mensagens}`);
      } else {
        throw new Error(`Erro inesperado: ${response.statusText}`);
      }
    } catch (err: any) {
      setMensagem(`Erro: ${err.message}`);
    }
  }

  if (loading) return <div className="p-6">Carregando categorias...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Listagem de Categorias Cadastradas
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Adicionar Categoria
        </button>
      </div>

      {mensagem && (
        <div
          className={`mb-4 p-2 rounded ${
            mensagem.startsWith("Erro")
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {mensagem}
        </div>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Descrição</th>
            <th className="py-2 px-4 text-left">Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{categoria.id}</td>
              <td className="py-2 px-4">{categoria.descricao}</td>
              <td className="py-2 px-4">{categoria.finalidadeDescricao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CadastroCategoriasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdicionarCategoria}
      />

      <Paginacao page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default ListagemCategorias;
