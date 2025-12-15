using GastosResidenciais.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Interfaces
{
    public interface ITransacaoRepository
    {
        Task AdicionarTransacaoAsync(Transacao transacao);
        Task<IEnumerable<Transacao>> ListarTransacoesAsync();
    }
}
