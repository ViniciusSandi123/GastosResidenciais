using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Interfaces;
using GastosResidenciais.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;
        public CategoriaController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpPost]
        public async Task<IActionResult> CriarCategoria([FromBody] CategoriaDTO categoriaDTO)
        {
            var retorno = await _categoriaService.AdicionarCategoria(categoriaDTO);

            if (!retorno.Success)
                return BadRequest(retorno.Error);

            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> ListarCategorias(int page = 1, int pageSize = 10)
        {
            var (items, total) = await _categoriaService.ListarCategorias(page, pageSize);

            if (!items.Any())
                return NoContent();

            return Ok(new
            {
                items,
                total,
                page,
                pageSize
            });

        }
    }
}
