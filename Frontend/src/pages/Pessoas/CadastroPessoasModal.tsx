import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nome: string, idade: number) => void;
}

function CadastroPessoasModal({ isOpen, onClose, onSave }: ModalProps) {
  const [nome, setDescricao] = useState("");
  const [idade, setIdade] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="fixed inset-0 bg-black/20 z-40"></div>
      <div className="bg-white p-6 rounded shadow-lg w-96 z-50">
        <h2 className="text-xl font-bold mb-4">Cadastrar Pessoa</h2>
        <div className="mb-4">
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Idade</label>
          <input
            value={idade}
            onChange={(e) => setIdade(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          ></input>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSave(nome, idade);
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastroPessoasModal;
