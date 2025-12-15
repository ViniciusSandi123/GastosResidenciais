using AutoMapper;
using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Services;
using GastosResidenciais.Domain.Helpers.Enums;
using GastosResidenciais.Domain.Interfaces;
using GastosResidenciais.Domain.Models;
using Moq;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GastosResidenciais.Tests.Services
{
    public class CategoriaServiceTest
    {
        private readonly Mock<IMapper> _mapperMock;
        private readonly Mock<ICategoriaRepository> _repositoryMock;
        private readonly CategoriaService _service;

        public CategoriaServiceTest()
        {
            _mapperMock = new Mock<IMapper>();
            _repositoryMock = new Mock<ICategoriaRepository>();
            _service = new CategoriaService(_mapperMock.Object, _repositoryMock.Object);
        }

        [Fact]
        public async Task AdicionarCategoria_DeveRetornarOk()
        {
            var categoriaDTO = new CategoriaDTO { Id = 1, Descricao = "Aluguel", Finalidade = eFinalidade.Receita };
            var categoria = new Categoria { Id = 1, Descricao = "Aluguel", Finalidade = eFinalidade.Receita };

            _mapperMock.Setup(m => m.Map<Categoria>(categoriaDTO)).Returns(categoria);
            _repositoryMock.Setup(r => r.AdicionarCategoriaAsync(categoria)).Returns(Task.CompletedTask);

            var result = await _service.AdicionarCategoria(categoriaDTO);

            Assert.True(result.Success);
            _repositoryMock.Verify(r => r.AdicionarCategoriaAsync(It.IsAny<Categoria>()), Times.Once);
        }

        [Fact]
        public async Task ListarCategorias_DeveRetornarListaDeDTOs()
        {
            var categorias = new List<Categoria>
            {
                new Categoria { Id = 1, Descricao = "Aluguel", Finalidade = eFinalidade.Receita },
                new Categoria { Id = 2, Descricao = "Transporte", Finalidade = eFinalidade.Despesa }
            };

            var categoriasDTO = new List<CategoriaDTO>
            {
                new CategoriaDTO { Id = 1, Descricao = "Aluguel", Finalidade = eFinalidade.Receita },
                new CategoriaDTO { Id = 2, Descricao = "Transporte", Finalidade = eFinalidade.Despesa }
            };

            _repositoryMock.Setup(r => r.ListarCategoriasAsync()).ReturnsAsync(categorias);
            _mapperMock.Setup(m => m.Map<IEnumerable<CategoriaDTO>>(categorias)).Returns(categoriasDTO);

            var result = await _service.ListarCategorias();

            Assert.NotNull(result);
            var lista = Assert.IsType<List<CategoriaDTO>>(result);
            Assert.Equal(2, lista.Count);
            Assert.Contains(lista, c => c.Descricao == "Aluguel" && c.Finalidade == eFinalidade.Receita);
            Assert.Contains(lista, c => c.Descricao == "Transporte" && c.Finalidade == eFinalidade.Despesa);
        }
    }
}