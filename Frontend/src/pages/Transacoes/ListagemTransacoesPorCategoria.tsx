import { useState, useEffect } from "react";
import Paginacao from "../../components/Paginacao";

interface TransacaoPorCategoria {
  idCategoria: number;
  descricao: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface ApiResponsePorCategoria {
  items: {
    pessoas: any;
    categorias: TransacaoPorCategoria[];
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
  };
  total: number;
  page: number;
  pageSize: number;
}

function ListagemTransacoesPorCategoria() {
  const [transacoes, setTransacoes] = useState<TransacaoPorCategoria[]>([]);
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
        setLoading(true);

        const response = await fetch(
          `http://localhost:5144/api/Transacao/totalPorCategoria?page=${page}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar as transações por categoria: ${response.statusText}`
          );
        }

        const data: ApiResponsePorCategoria = await response.json();

        setTransacoes(data.items.categorias ?? []);
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
    return <div className="p-6">Carregando transações por categoria...</div>;

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
            <th className="py-2 px-4 text-left">Categoria</th>
            <th className="py-2 px-4 text-left">Total Receitas</th>
            <th className="py-2 px-4 text-left">Total Despesas</th>
            <th className="py-2 px-4 text-left">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.idCategoria} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{t.idCategoria}</td>
              <td className="py-2 px-4">{t.descricao}</td>
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
      <Paginacao page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default ListagemTransacoesPorCategoria;
