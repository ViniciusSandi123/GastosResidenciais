using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GastosResidenciais.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpPost]
        public async Task<IActionResult> CriarPessoa([FromBody] PessoaDTO pessoaDTO)
        {
            var retorno = await _pessoaService.AdicionarPessoa(pessoaDTO);

            if (!retorno.Success)
                return BadRequest(retorno.Error);

            return Created();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> ExcluirPessoa(int id)
        {
            var retorno = await _pessoaService.DeletarPessoa(id);

            if (!retorno.Success)
                return NotFound(retorno.Error);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> ListarPessoas()
        {
            var pessoas = await _pessoaService.ListarPessoas();

            if (!pessoas.Any())
                return NoContent();

            return Ok(pessoas);
        }
    }
}
