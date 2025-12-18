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
        public async Task<IActionResult> ListarTransacoes(int page = 1 , int pageSize = 10)
        {
            var (items, total) = await _transacaoService.ListarTransacoes(page, pageSize);

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

        [HttpGet("totalPorPessoa")]
        public async Task<IActionResult> ListarTotalTransacoesPorPessoa(int page = 1, int pageSize = 10)
        {
            var (items, total) = await _transacaoService.ListarTotalTransacoesPorPessoa(page, pageSize);

            if (!items.Pessoas.Any())
                return NoContent();

            return Ok(new
            {
                items,
                total,
                page,
                pageSize
            });
        }

        [HttpGet("totalPorCategoria")]
        public async Task<IActionResult> ListarTotalTransacoesPorCategoria(int page = 1, int pageSize = 10)
        {
            var (items, total) = await _transacaoService.ListarTotalTransacoesPorCategoria(page, pageSize);

            if (!items.Categorias.Any())
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
