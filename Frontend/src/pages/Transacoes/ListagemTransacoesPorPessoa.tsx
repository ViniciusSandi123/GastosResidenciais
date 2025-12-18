import { useState, useEffect } from "react";

interface TransacaoPorPessoa {
  idPessoa: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface ApiResponsePorPessoa {
  items: {
    pessoas: TransacaoPorPessoa[];
    categorias: any;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  };
  total: number;
  page: number;
  pageSize: number;
}

function ListagemTransacoesPorPessoa() {
  const [transacoes, setTransacoes] = useState<TransacaoPorPessoa[]>([]);
  const [totais, setTotais] = useState<{
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    async function fetchTransacoes() {
      try {
        const response = await fetch(
          `http://localhost:5144/api/Transacao/totalPorPessoa?page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error(
            `Erro ao buscar as transações por pessoa: ${response.statusText}`
          );
        }
        const data: ApiResponsePorPessoa = await response.json();
        setTransacoes(data.items.pessoas ?? []);
        setTotais({
          totalReceitas: data.items.totalReceitas ?? 0,
          totalDespesas: data.items.totalDespesas ?? 0,
          saldo: data.items.saldo ?? 0,
        });
        setTotal(data.total ?? 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransacoes();
  }, [page, pageSize]);

  if (loading)
    return <div className="p-6">Carregando transações por pessoa...</div>;
  if (error) return <div className="p-6 text-red-500">Erro: {error}</div>;

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Pessoa</th>
            <th className="py-2 px-4 text-left">Total Receitas</th>
            <th className="py-2 px-4 text-left">Total Despesas</th>
            <th className="py-2 px-4 text-left">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.idPessoa} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{t.idPessoa}</td>
              <td className="py-2 px-4">{t.nome}</td>
              <td className="py-2 px-4">{formatarMoeda(t.totalReceitas)}</td>
              <td className="py-2 px-4">{formatarMoeda(t.totalDespesas)}</td>
              <td className="py-2 px-4">{formatarMoeda(t.saldo)}</td>
            </tr>
          ))}

          {totais && (
            <tr className="bg-gray-100 font-bold">
              <td className="py-2 px-4" colSpan={2}>
                Total Geral
              </td>
              <td className="py-2 px-4">
                {formatarMoeda(totais.totalReceitas)}
              </td>
              <td className="py-2 px-4">
                {formatarMoeda(totais.totalDespesas)}
              </td>
              <td className="py-2 px-4">{formatarMoeda(totais.saldo)}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="text-sm">
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ListagemTransacoesPorPessoa;
