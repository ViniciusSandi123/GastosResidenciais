import { useState } from "react";
import {
  eFinalidade,
  eFinalidadeDescricao,
} from "../../helpers/enums/eFinalidade";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (descricao: string, finalidade: eFinalidade) => void;
}

function CadastroCategoriasModal({ isOpen, onClose, onSave }: ModalProps) {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<eFinalidade | "">("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="fixed inset-0 bg-black/20 z-40"></div>
      <div className="bg-white p-6 rounded shadow-lg w-96 z-50">
        <h2 className="text-xl font-bold mb-4">Cadastrar Categoria</h2>
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
          <label className="block mb-1">Finalidade</label>
          <select
            value={finalidade}
            onChange={(e) =>
              setFinalidade(Number(e.target.value) as eFinalidade)
            }
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">Selecione</option>

            {Object.values(eFinalidade).map((valor) => (
              <option key={valor} value={valor}>
                {eFinalidadeDescricao[valor]}
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
            onClick={() => {
              if (finalidade === "") return;
              onSave(descricao, finalidade);
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

export default CadastroCategoriasModal;
