import { useState, useEffect } from "react";
import { eTipoDescricao, eTipo } from "../../helpers/enums/eTipo";

export interface Transacao {
  id: number;
  descricao: string;
  idCategoria: number;
  categoriaDescricao: string;
  idPessoa: number;
  pessoaNome: string;
  tipo: number;
  tipoDescricao: string;
  valor: number;
}

function ListagemTodasTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("http://localhost:5144/api/Transacao");
        if (!response.ok) {
          throw new Error(
            `Erro ao buscar as Transações cadastradas: ${response.statusText}`
          );
        }
        const data: Transacao[] = await response.json();

        const transacoes: Transacao[] = data.map((t: any) => ({
          id: t.id,
          descricao: t.descricao,
          valor: t.valor,
          tipo: t.tipo,
          tipoDescricao: t.tipoDescricao,
          idCategoria: t.idCategoria,
          categoriaDescricao: t.categoria?.descricao,
          idPessoa: t.idPessoa,
          pessoaNome: t.pessoa?.nome,
        }));

        setTransacoes(transacoes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  if (loading) return <div className="p-6">Carregando todas transações...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Descrição</th>
            <th className="py-2 px-4 text-left">Categoria</th>
            <th className="py-2 px-4 text-left">Pessoa</th>
            <th className="py-2 px-4 text-left">Tipo</th>
            <th className="py-2 px-4 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{transacao.id}</td>
              <td className="py-2 px-4">{transacao.descricao}</td>
              <td className="py-2 px-4">{transacao.categoriaDescricao}</td>
              <td className="py-2 px-4">{transacao.pessoaNome}</td>
              <td className="py-2 px-4">
                {eTipoDescricao[transacao.tipo as eTipo]}
              </td>
              <td className="py-2 px-4">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transacao.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListagemTodasTransacoes;
