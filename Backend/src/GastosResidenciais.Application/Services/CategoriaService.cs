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
    public class CategoriaService : ICategoriaService
    {
        private readonly IMapper _mapper;
        private readonly ICategoriaRepository _categoriaRepository;
        public CategoriaService(IMapper mapper, ICategoriaRepository categoriaRepository)
        {
            _mapper = mapper;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<Result> AdicionarCategoria(CategoriaDTO categoriaDTO)
        {
            var pessoa = _mapper.Map<Categoria>(categoriaDTO);
            await _categoriaRepository.AdicionarCategoriaAsync(pessoa);
            return Result.Ok();
        }

        public async Task<(IEnumerable<CategoriaDTO> items, int total)> ListarCategorias(int page, int pageSize)
        {
            var retorno = await _categoriaRepository.ListarCategoriasAsync();
            var categorias = _mapper.Map<IEnumerable<CategoriaDTO>>(retorno);
            var total = categorias.Count();
            var items = categorias
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return (items, total);

        }
    }
}
