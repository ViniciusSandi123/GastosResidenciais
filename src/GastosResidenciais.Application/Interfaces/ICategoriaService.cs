using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Interfaces
{
    public interface ICategoriaService
    {
        Task<Result> AdicionarCategoria (CategoriaDTO categoriaDTO);
        Task<IEnumerable<CategoriaDTO>> ListarCategorias();
    }
}
