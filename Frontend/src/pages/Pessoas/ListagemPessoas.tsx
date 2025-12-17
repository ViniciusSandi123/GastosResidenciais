import { useState, useEffect } from "react";
import CadastroPessoasModal from "./CadastroPessoasModal";
import ExclusaoModal from "../../components/ExclusaoModal";

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}
function ListagemPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [pessoaParaExcluir, setPessoaParaExcluir] = useState<Pessoa | null>(
    null
  );

  useEffect(() => {
    async function fetchPessoas() {
      try {
        const response = await fetch("http://localhost:5144/api/Pessoa");
        if (!response.ok) {
          throw new Error(
            `Erro ao buscar ao buscar as Pessoas cadastradas: ${response.statusText}`
          );
        }
        const data: Pessoa[] = await response.json();
        setPessoas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPessoas();
  }, []);

  async function handleAdicionarPessoa(nome: string, idade: number) {
    try {
      const response = await fetch("http://localhost:5144/api/Pessoa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, idade }),
      });

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

  async function handleExcluirPessoa(id: number) {
    try {
      const response = await fetch(`http://localhost:5144/api/Pessoa/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMensagem("Pessoa excluída com sucesso!");
        setPessoas((prev) => prev.filter((p) => p.id !== id));
      } else {
        throw new Error(`Erro ao excluir pessoa: ${response.statusText}`);
      }
    } catch (err: any) {
      setMensagem(`Erro: ${err.message}`);
    } finally {
      setPessoaParaExcluir(null);
    }
  }
  if (loading) {
    return <div className="p-6">Carregando Pessoas...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listagem de Pessoas Cadastradas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Adicionar Pessoa
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
            <th className="py-2 px-4 text-left">Nome</th>
            <th className="py-2 px-4 text-left">Idade</th>
            <th className="py-2 px-4 text-left w-24">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{pessoa.id}</td>
              <td className="py-2 px-4">{pessoa.nome}</td>
              <td className="py-2 px-4">{pessoa.idade}</td>
              <td className="py-2 px-4 w-24 text-center">
                <button
                  onClick={() => setPessoaParaExcluir(pessoa)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CadastroPessoasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdicionarPessoa}
      />

      <ExclusaoModal
        isOpen={!!pessoaParaExcluir}
        onClose={() => setPessoaParaExcluir(null)}
        onConfirm={() =>
          pessoaParaExcluir && handleExcluirPessoa(pessoaParaExcluir.id)
        }
        mensagem={`Deseja realmente excluir ${pessoaParaExcluir?.nome}?`}
      />
    </div>
  );
}
export default ListagemPessoas;
