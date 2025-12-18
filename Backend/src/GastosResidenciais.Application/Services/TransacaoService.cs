using AutoMapper;
using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Interfaces;
using GastosResidenciais.Domain.Common;
using GastosResidenciais.Domain.Helpers.Enums;
using GastosResidenciais.Domain.Interfaces;
using GastosResidenciais.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly IMapper _mapper;
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ICategoriaRepository _categoriaRepository;
        public TransacaoService(
            IMapper mapper, 
            ITransacaoRepository transacaoRepository, 
            IPessoaRepository pessoaRepository,
            ICategoriaRepository categoriaRepository)
        {
            _mapper = mapper;
            _transacaoRepository = transacaoRepository;
            _pessoaRepository = pessoaRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<Result> AdicionarTransacao(TransacaoDTO transacaoDTO)
        {
            if (transacaoDTO.Pessoa.Idade < 18 && transacaoDTO.Tipo != eTipo.Despesa)
            {
                return Result.Fail("Menores de 18 anos podem cadastrar receitas, apenas de despesas");
            }

            if (transacaoDTO.Tipo == eTipo.Receita && transacaoDTO.Categoria.Finalidade == eFinalidade.Despesa ||
                transacaoDTO.Tipo == eTipo.Despesa && transacaoDTO.Categoria.Finalidade == eFinalidade.Receita)
            {
                return Result.Fail("O Tipo da transação deve ser compativel com a Finalidade da Categoria escolhida");
            }

            var transacao = Transacao.Criar(
                transacaoDTO.Descricao,
                transacaoDTO.Valor,
                transacaoDTO.Tipo,
                transacaoDTO.IdCategoria,
                transacaoDTO.IdPessoa
            );
            await _transacaoRepository.AdicionarTransacaoAsync(transacao);
            return Result.Ok();
        }

        public async Task<(IEnumerable<TransacaoDTO> items, int total)> ListarTransacoes(int page, int pageSize)
        {
            var retorno = await _transacaoRepository.ListarTransacoesAsync();
            var transacoes = _mapper.Map<IEnumerable<TransacaoDTO>>(retorno);
            var total = transacoes.Count();
            var items = transacoes
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return (items, total);
        }

        public async Task<(TransacoesTotalDTO items, int total)> ListarTotalTransacoesPorPessoa(int page, int pageSize)
        {
            var pessoasDb = await _pessoaRepository.ListarPessoasAsync();
            var transacoes = await _transacaoRepository.ListarTransacoesAsync();

            var pessoasComTotais = pessoasDb
                .GroupJoin(
                    transacoes,
                    p => p.Id,
                    t => t.IdPessoa,
                    (p, transacoesPessoa) => new TransacoesTotalPorPessoaDTO
                    {
                        IdPessoa = p.Id,
                        Nome = p.Nome,
                        TotalReceitas = transacoesPessoa
                            .Where(t => t.Tipo == eTipo.Receita)
                            .Sum(t => t.Valor),
                        TotalDespesas = transacoesPessoa
                            .Where(t => t.Tipo == eTipo.Despesa)
                            .Sum(t => t.Valor)
                    }
                )
                .ToList();

            var totalReceitas = pessoasComTotais.Sum(p => p.TotalReceitas);
            var totalDespesas = pessoasComTotais.Sum(p => p.TotalDespesas);

            var total = pessoasComTotais.Count;

            var pessoasPaginadas = pessoasComTotais
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var items = new TransacoesTotalDTO
            {
                Pessoas = pessoasPaginadas,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas
            };

            return (items, total);
        }

        public async Task<(TransacoesTotalDTO items, int total)> ListarTotalTransacoesPorCategoria(int page, int pageSize)
        {
            var categorias = await _categoriaRepository.ListarCategoriasAsync();
            var transacoes = await _transacaoRepository.ListarTransacoesAsync();

            var categoriasComTotais = categorias
                .GroupJoin(
                    transacoes,
                    c => c.Id,
                    t => t.IdCategoria,
                    (c, transacoesCategoria) => new TransacoesTotalPorCategoriaDTO
                    {
                        IdCategoria = c.Id,
                        Descricao = c.Descricao,
                        TotalReceitas = transacoesCategoria
                            .Where(t => t.Tipo == eTipo.Receita)
                            .Sum(t => t.Valor),
                        TotalDespesas = transacoesCategoria
                            .Where(t => t.Tipo == eTipo.Despesa)
                            .Sum(t => t.Valor)
                    }
                )
                .ToList();
            var totalReceitas = categoriasComTotais.Sum(p => p.TotalReceitas);
            var totalDespesas = categoriasComTotais.Sum(p => p.TotalDespesas);

            var total = categoriasComTotais.Count();

            var categoriasPaginadas = categoriasComTotais
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var items = new TransacoesTotalDTO
            {
                Categorias = categoriasPaginadas,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas
            };

            return (items, total);
        }
    }
}
