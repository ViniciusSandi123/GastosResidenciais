using GastosResidenciais.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Interfaces
{
    public interface IPessoaRepository
    {
        Task AdicionarPessoaAsync(Pessoa pessoa);
        Task DeletarPessoaAsync(Pessoa pessoa);
        Task<IEnumerable<Pessoa>> ListarPessoasAsync();
        Task<Pessoa?> ObterPessoaPorIdAsync(int id);
    }
}
