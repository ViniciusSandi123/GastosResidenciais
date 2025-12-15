using AutoMapper;
using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Services;
using GastosResidenciais.Domain.Common;
using GastosResidenciais.Domain.Interfaces;
using GastosResidenciais.Domain.Models;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GastosResidenciais.Tests.Services
{
    public class PessoaServiceTest
    {
        private readonly Mock<IMapper> _mapperMock;
        private readonly Mock<IPessoaRepository> _repositoryMock;
        private readonly PessoaService _service;

        public PessoaServiceTest()
        {
            _mapperMock = new Mock<IMapper>();
            _repositoryMock = new Mock<IPessoaRepository>();
            _service = new PessoaService(_repositoryMock.Object, _mapperMock.Object);
        }

        [Fact]
        public async Task AdicionarPessoa_DeveRetornarOk()
        {
            var pessoaDTO = new PessoaDTO { Id = 1, Nome = "Vinicius", Idade = 30 };
            var pessoa = new Pessoa { Id = 1, Nome = "Vinicius", Idade = 30 };

            _mapperMock.Setup(m => m.Map<Pessoa>(pessoaDTO)).Returns(pessoa);
            _repositoryMock.Setup(r => r.AdicionarPessoaAsync(pessoa)).Returns(Task.CompletedTask);

            var result = await _service.AdicionarPessoa(pessoaDTO);

            Assert.True(result.Success);
            _repositoryMock.Verify(r => r.AdicionarPessoaAsync(It.IsAny<Pessoa>()), Times.Once);
        }

        [Fact]
        public async Task DeletarPessoa_QuandoPessoaNaoExiste_DeveRetornarFail()
        {
            int id = 99;
            _repositoryMock.Setup(r => r.ObterPessoaPorIdAsync(id)).ReturnsAsync((Pessoa)null);

            var result = await _service.DeletarPessoa(id);

            Assert.False(result.Success);
            Assert.Equal("Pessoa não encontrada", result.Error);
            _repositoryMock.Verify(r => r.DeletarPessoaAsync(It.IsAny<Pessoa>()), Times.Never);
        }

        [Fact]
        public async Task DeletarPessoa_QuandoPessoaExiste_DeveRetornarOk()
        {
            var pessoa = new Pessoa { Id = 1, Nome = "Vinicius", Idade = 30 };
            _repositoryMock.Setup(r => r.ObterPessoaPorIdAsync(pessoa.Id)).ReturnsAsync(pessoa);
            _repositoryMock.Setup(r => r.DeletarPessoaAsync(pessoa)).Returns(Task.CompletedTask);

            var result = await _service.DeletarPessoa(pessoa.Id);

            Assert.True(result.Success);
            _repositoryMock.Verify(r => r.DeletarPessoaAsync(It.IsAny<Pessoa>()), Times.Once);
        }

        [Fact]
        public async Task ListarPessoas_DeveRetornarListaDeDTOs()
        {
            var pessoas = new List<Pessoa>
            {
                new Pessoa { Id = 1, Nome = "Vinicius", Idade = 30 },
                new Pessoa { Id = 2, Nome = "Maria", Idade = 25 }
            };

            var pessoasDTO = new List<PessoaDTO>
            {
                new PessoaDTO { Id = 1, Nome = "Vinicius", Idade = 30 },
                new PessoaDTO { Id = 2, Nome = "Maria", Idade = 25 }
            };

            _repositoryMock.Setup(r => r.ListarPessoasAsync()).ReturnsAsync(pessoas);
            _mapperMock.Setup(m => m.Map<IEnumerable<PessoaDTO>>(pessoas)).Returns(pessoasDTO);

            var result = await _service.ListarPessoas();

            Assert.NotNull(result);
            var lista = Assert.IsType<List<PessoaDTO>>(result);
            Assert.Equal(2, lista.Count);
            Assert.Contains(lista, p => p.Nome == "Vinicius" && p.Idade == 30);
            Assert.Contains(lista, p => p.Nome == "Maria" && p.Idade == 25);
        }
    }
}