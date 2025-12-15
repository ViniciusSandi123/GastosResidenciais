using AutoMapper;
using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Services;
using GastosResidenciais.Domain.Common;
using GastosResidenciais.Domain.Helpers.Enums;
using GastosResidenciais.Domain.Interfaces;
using GastosResidenciais.Domain.Models;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GastosResidenciais.Tests.Services
{
    public class TransacaoServiceTests
    {
        private readonly Mock<IMapper> _mapperMock;
        private readonly Mock<ITransacaoRepository> _transacaoRepoMock;
        private readonly Mock<IPessoaRepository> _pessoaRepoMock;
        private readonly Mock<ICategoriaRepository> _categoriaRepoMock;
        private readonly TransacaoService _service;

        public TransacaoServiceTests()
        {
            _mapperMock = new Mock<IMapper>();
            _transacaoRepoMock = new Mock<ITransacaoRepository>();
            _pessoaRepoMock = new Mock<IPessoaRepository>();
            _categoriaRepoMock = new Mock<ICategoriaRepository>();

            _service = new TransacaoService(
                _mapperMock.Object,
                _transacaoRepoMock.Object,
                _pessoaRepoMock.Object,
                _categoriaRepoMock.Object
            );
        }

        [Fact]
        public async Task AdicionarTransacao_MenorDeIdadeComReceita_DeveRetornarFail()
        {
            var dto = new TransacaoDTO
            {
                Pessoa = new PessoaDTO { Id = 1, Nome = "João", Idade = 16 },
                Categoria = new CategoriaDTO { Id = 1, Descricao = "Salário", Finalidade = eFinalidade.Receita },
                Tipo = eTipo.Receita,
                Valor = 1000
            };

            var result = await _service.AdicionarTransacao(dto);

            Assert.False(result.Success);
            Assert.Equal("Menores de 18 anos podem cadastrar receitas, apenas de despesas", result.Error);
            _transacaoRepoMock.Verify(r => r.AdicionarTransacaoAsync(It.IsAny<Transacao>()), Times.Never);
        }

        [Fact]
        public async Task AdicionarTransacao_CategoriaIncompativel_DeveRetornarFail()
        {
            var dto = new TransacaoDTO
            {
                Pessoa = new PessoaDTO { Id = 1, Nome = "Maria", Idade = 25 },
                Categoria = new CategoriaDTO { Id = 1, Descricao = "Aluguel", Finalidade = eFinalidade.Despesa },
                Tipo = eTipo.Receita,
                Valor = 500
            };

            var result = await _service.AdicionarTransacao(dto);

            Assert.False(result.Success);
            Assert.Equal("O Tipo da transação deve ser compativel com a Finalidade da Categoria escolhida", result.Error);
            _transacaoRepoMock.Verify(r => r.AdicionarTransacaoAsync(It.IsAny<Transacao>()), Times.Never);
        }

        [Fact]
        public async Task AdicionarTransacao_Valida_DeveRetornarOk()
        {
            var dto = new TransacaoDTO
            {
                Pessoa = new PessoaDTO { Id = 1, Nome = "Carlos", Idade = 30 },
                Categoria = new CategoriaDTO { Id = 1, Descricao = "Salário", Finalidade = eFinalidade.Receita },
                Tipo = eTipo.Receita,
                Valor = 2000,
                IdCategoria = 1,
                IdPessoa = 1
            };

            _transacaoRepoMock.Setup(r => r.AdicionarTransacaoAsync(It.IsAny<Transacao>()))
                              .Returns(Task.CompletedTask);

            var result = await _service.AdicionarTransacao(dto);

            Assert.True(result.Success);
            _transacaoRepoMock.Verify(r => r.AdicionarTransacaoAsync(It.IsAny<Transacao>()), Times.Once);
        }

        [Fact]
        public async Task ListarTransacoes_DeveRetornarListaDeDTOs()
        {
            var transacoes = new List<Transacao>
            {
                Transacao.Criar("Salário", 2000, eTipo.Receita, 1, 1),
                Transacao.Criar("Aluguel", 800, eTipo.Despesa, 2, 1)
            };

            var transacoesDTO = new List<TransacaoDTO>
            {
                new TransacaoDTO { Descricao = "Salário", Valor = 2000, Tipo = eTipo.Receita },
                new TransacaoDTO { Descricao = "Aluguel", Valor = 800, Tipo = eTipo.Despesa }
            };

            _transacaoRepoMock.Setup(r => r.ListarTransacoesAsync()).ReturnsAsync(transacoes);
            _mapperMock.Setup(m => m.Map<IEnumerable<TransacaoDTO>>(transacoes)).Returns(transacoesDTO);

            var result = await _service.ListarTransacoes();

            Assert.NotNull(result);
            var lista = Assert.IsType<List<TransacaoDTO>>(result);
            Assert.Equal(2, lista.Count);
        }

        [Fact]
        public async Task ListarTotalTransacoesPorPessoa_DeveCalcularTotaisCorretamente()
        {
            var pessoas = new List<Pessoa>
            {
                new Pessoa { Id = 1, Nome = "Carlos", Idade = 30 },
                new Pessoa { Id = 2, Nome = "Maria", Idade = 25 }
            };

            var transacoes = new List<Transacao>
            {
                Transacao.Criar("Salário", 2000, eTipo.Receita, 1, 1),
                Transacao.Criar("Aluguel", 800, eTipo.Despesa, 2, 1),
                Transacao.Criar("Freelance", 500, eTipo.Receita, 1, 2)
            };

            _pessoaRepoMock.Setup(r => r.ListarPessoasAsync()).ReturnsAsync(pessoas);
            _transacaoRepoMock.Setup(r => r.ListarTransacoesAsync()).ReturnsAsync(transacoes);

            var result = await _service.ListarTotalTransacoesPorPessoa();

            Assert.NotNull(result);
            Assert.Equal(2500, result.TotalReceitas);
            Assert.Equal(800, result.TotalDespesas);
            Assert.Contains(result.Pessoas, p => p.Nome == "Carlos" && p.TotalReceitas == 2000 && p.TotalDespesas == 800);
            Assert.Contains(result.Pessoas, p => p.Nome == "Maria" && p.TotalReceitas == 500 && p.TotalDespesas == 0);
        }

        [Fact]
        public async Task ListarTotalTransacoesPorCategoria_DeveCalcularTotaisCorretamente()
        {
            var categorias = new List<Categoria>
            {
                new Categoria { Id = 1, Descricao = "Salário", Finalidade = eFinalidade.Receita },
                new Categoria { Id = 2, Descricao = "Aluguel", Finalidade = eFinalidade.Despesa }
            };

            var transacoes = new List<Transacao>
            {
                Transacao.Criar("Salário", 2000, eTipo.Receita, 1, 1),
                Transacao.Criar("Aluguel", 800, eTipo.Despesa, 2, 1),
                Transacao.Criar("Freelance", 500, eTipo.Receita, 1, 2)
            };

            _categoriaRepoMock.Setup(r => r.ListarCategoriasAsync()).ReturnsAsync(categorias);
            _transacaoRepoMock.Setup(r => r.ListarTransacoesAsync()).ReturnsAsync(transacoes);

            var result = await _service.ListarTotalTransacoesPorCategoria();

            Assert.NotNull(result);
            Assert.Equal(2500, result.TotalReceitas);
            Assert.Equal(800, result.TotalDespesas);
            Assert.Contains(result.Categorias, c => c.Descricao == "Salário" && c.TotalReceitas == 2500);
            Assert.Contains(result.Categorias, c => c.Descricao == "Aluguel" && c.TotalDespesas == 800);
        }
    }
}