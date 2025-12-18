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
        Task<(IEnumerable<TransacaoDTO> items, int total)> ListarTransacoes(int page, int pageSize);
        Task<(TransacoesTotalDTO items, int total)> ListarTotalTransacoesPorPessoa(int page, int pageSize);
        Task<(TransacoesTotalDTO items, int total)> ListarTotalTransacoesPorCategoria(int page, int pageSize);
    }
}
