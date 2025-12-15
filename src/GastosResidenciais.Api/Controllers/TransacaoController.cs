using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Application.Interfaces;
using GastosResidenciais.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _transacaoService;
        public TransacaoController(ITransacaoService transacaoService) 
        {
            _transacaoService = transacaoService;
        }
        [HttpPost]
        public async Task<IActionResult> CriarTransacao([FromBody] TransacaoDTO transacaoDTO)
        {
            var retorno = await _transacaoService.AdicionarTransacao(transacaoDTO);

            if (!retorno.Success)
                return BadRequest(retorno.Error);

            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> ListarTransacoes()
        {
            var transacoes = await _transacaoService.ListarTransacoes();

            if (!transacoes.Any())
                return NoContent();

            return Ok(transacoes);
        }

        [HttpGet("totalPorPessoa")]
        public async Task<IActionResult> ListarTotalTransacoesPorPessoa()
        {
            var transacoes = await _transacaoService.ListarTotalTransacoesPorPessoa();

            if (transacoes.Pessoas.Count() == 0)
                return NoContent();

            return Ok(transacoes);
        }

        [HttpGet("totalPorCategoria")]
        public async Task<IActionResult> ListarTotalTransacoesPorCategoria()
        {
            var transacoes = await _transacaoService.ListarTotalTransacoesPorCategoria();

            if (transacoes.Categorias.Count() == 0)
                return NoContent();

            return Ok(transacoes);
        }
    }
}
