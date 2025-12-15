using GastosResidenciais.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Interfaces
{
    public interface ICategoriaRepository
    {
        Task AdicionarCategoriaAsync(Categoria categoria);
        Task<IEnumerable<Categoria>> ListarCategoriasAsync();
        Task<Categoria?> ObterCategoriaPorIdAsync(int id);
    }
}
