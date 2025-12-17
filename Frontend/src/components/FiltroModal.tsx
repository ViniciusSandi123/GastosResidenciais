interface FiltroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (filtro: "todas" | "porPessoa" | "porCategoria") => void;
}

function FiltroModal({ isOpen, onClose, onSelect }: FiltroModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Filtrar Transações</h2>
        <div className="flex flex-col gap-2">
          <button
            className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => {
              onSelect("todas");
              onClose();
            }}
          >
            Todas
          </button>
          <button
            className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => {
              onSelect("porPessoa");
              onClose();
            }}
          >
            Por Pessoa
          </button>
          <button
            className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => {
              onSelect("porCategoria");
              onClose();
            }}
          >
            Por Categoria
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FiltroModal;
