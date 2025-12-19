interface Paginacao {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Paginacao({
  page,
  totalPages,
  onPageChange,
}: Paginacao) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="text-sm">
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
