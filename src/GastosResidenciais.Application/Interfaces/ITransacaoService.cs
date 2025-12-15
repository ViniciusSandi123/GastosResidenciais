using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Interfaces
{
    public interface ITransacaoService
    {
        Task<Result> AdicionarTransacao(TransacaoDTO transacaoDTO);
        Task<IEnumerable<TransacaoDTO>> ListarTransacoes();
        Task<TransacoesTotalDTO> ListarTotalTransacoesPorPessoa();
        Task<TransacoesTotalDTO> ListarTotalTransacoesPorCategoria();
    }
}
