import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import CadastroTransacaoModal from "./CadastroTransacaoModal";
import FiltroModal from "../../components/FiltroModal";
import ListagemTodasTransacoes from "./ListagemTodasTransacoes";
import ListagemTransacoesPorPessoa from "./ListagemTransacoesPorPessoa";
import ListagemTransacoesPorCategoria from "./ListagemTransacoesPorCategoria";

function ListagemTransacoes() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<"todas" | "porPessoa" | "porCategoria">(
    "todas"
  );
  const [isFiltroOpen, setIsFiltroOpen] = useState(false);

  async function handleAdicionarTransacao(transacao: any) {
    try {
      const response = await fetch("http://localhost:5144/api/Transacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transacao),
      });

      if (response.status === 201) {
        setMensagem("Transação adicionada com sucesso!");
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Listagem de Transações</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer flex items-center gap-1"
          >
            Adicionar Transação
          </button>
          <button
            onClick={() => setIsFiltroOpen(true)}
            className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 cursor-pointer"
          >
            <FunnelIcon className="h-5 w-5" />
          </button>
        </div>
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

      <CadastroTransacaoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdicionarTransacao}
      />
      <FiltroModal
        isOpen={isFiltroOpen}
        onClose={() => setIsFiltroOpen(false)}
        onSelect={(novoFiltro) => setFiltro(novoFiltro)}
      />

      <div className="mt-6">
        {filtro === "todas" && <ListagemTodasTransacoes />}
        {filtro === "porPessoa" && <ListagemTransacoesPorPessoa />}
        {filtro === "porCategoria" && <ListagemTransacoesPorCategoria />}
      </div>
    </div>
  );
}

export default ListagemTransacoes;
