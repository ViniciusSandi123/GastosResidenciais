interface ExclusaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mensagem?: string;
}

function ExclusaoModal({
  isOpen,
  onClose,
  onConfirm,
  mensagem = "Você tem certeza de que deseja excluir?",
}: ExclusaoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="fixed inset-0 bg-black/20 z-40"></div>
      <div className="bg-white p-6 rounded shadow-lg w-96 z-50">
        <h2 className="text-xl font-bold mb-4">Confirmação</h2>
        <p className="mb-6">{mensagem}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Não
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExclusaoModal;
