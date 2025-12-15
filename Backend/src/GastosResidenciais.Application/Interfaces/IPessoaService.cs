using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Interfaces
{
    public interface IPessoaService
    {
        Task<Result> AdicionarPessoa(PessoaDTO pessoaDTO);
        Task<Result> DeletarPessoa(int id);
        Task<IEnumerable<PessoaDTO>> ListarPessoas();
    }
}
