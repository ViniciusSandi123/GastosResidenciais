using AutoMapper;
using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Interfaces;
using GastosResidenciais.Domain.Common;
using GastosResidenciais.Domain.Interfaces;
using GastosResidenciais.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly IMapper _mapper;
        private readonly IPessoaRepository _pessoaRepository;
        public PessoaService(IPessoaRepository pessoaRepository, IMapper mapper) 
        {
            _pessoaRepository = pessoaRepository;
            _mapper = mapper;
        }
        public async Task<Result> AdicionarPessoa(PessoaDTO pessoaDTO)
        {
            var pessoa = _mapper.Map<Pessoa>(pessoaDTO);
            await _pessoaRepository.AdicionarPessoaAsync(pessoa);
            return Result.Ok();
        }

        public async Task<Result> DeletarPessoa(int id)
        {
            var pessoa = await _pessoaRepository.ObterPessoaPorIdAsync(id);
            if (pessoa == null)
            {
                return Result.Fail("Pessoa não encontrada");
            }
            await _pessoaRepository.DeletarPessoaAsync(pessoa);
            return Result.Ok();
        }

        public async Task<IEnumerable<PessoaDTO>> ListarPessoas()
        {
            var retorno = await _pessoaRepository.ListarPessoasAsync();
            var pessoas = _mapper.Map<IEnumerable<PessoaDTO>>(retorno);
            return pessoas;
        }
    }
}
