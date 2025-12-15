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
        public async Task<IActionResult> ListarCategorias()
        {
            var categorias = await _categoriaService.ListarCategorias();

            if (!categorias.Any())
                return NoContent();

            return Ok(categorias);
        }
    }
}
