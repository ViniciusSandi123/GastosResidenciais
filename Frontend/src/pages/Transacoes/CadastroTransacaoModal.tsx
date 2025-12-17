import { useState, useEffect } from "react";
import {
  eTipo,
  eTipoDescricao,
  type eTipo as eTipoType,
} from "../../helpers/enums/eTipo";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transacao: any) => void;
}

interface Categoria {
  id: number;
  descricao: string;
  finalidade: number;
  finalidadeDescricao: string;
}

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

function CadastroTransacaoModal({ isOpen, onClose, onSave }: ModalProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<eTipoType>(eTipo.Despesa);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [idCategoria, setIdCategoria] = useState<number>(0);
  const [idPessoa, setIdPessoa] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const resCat = await fetch("http://localhost:5144/api/Categoria");
      const catData = await resCat.json();
      setCategorias(catData);

      const resPessoas = await fetch("http://localhost:5144/api/Pessoa");
      const pessoaData = await resPessoas.json();
      setPessoas(pessoaData);
    }
    fetchData();
  }, []);

  if (!isOpen) return null;

  const handleSalvar = () => {
    const categoriaSelecionada = categorias.find((c) => c.id === idCategoria);
    const pessoaSelecionada = pessoas.find((p) => p.id === idPessoa);

    const transacao = {
      id: 0,
      descricao,
      valor,
      tipo,
      tipoDescricao: eTipoDescricao[tipo],
      idCategoria,
      categoria: categoriaSelecionada,
      idPessoa,
      pessoa: pessoaSelecionada,
    };

    onSave(transacao);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Cadastrar Transação</h2>
        <div className="mb-4">
          <label className="block mb-1">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Valor</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(Number(e.target.value) as eTipoType)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value={eTipo.Despesa}>Despesa</option>
            <option value={eTipo.Receita}>Receita</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Categoria</label>
          <select
            value={idCategoria}
            onChange={(e) => setIdCategoria(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          >
            <option value={0}>Selecione</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Pessoa</label>
          <select
            value={idPessoa}
            onChange={(e) => setIdPessoa(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          >
            <option value={0}>Selecione</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastroTransacaoModal;
