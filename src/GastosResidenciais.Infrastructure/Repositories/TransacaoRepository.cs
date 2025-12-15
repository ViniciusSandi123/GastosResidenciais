using GastosResidenciais.Domain.Helpers.Enums;
using GastosResidenciais.Domain.Interfaces;
using GastosResidenciais.Domain.Models;
using GastosResidenciais.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Infrastructure.Repositories
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly Context _context;
        public TransacaoRepository(Context context) 
        {
            _context = context;
        }
        public async Task AdicionarTransacaoAsync(Transacao transacao)
        {
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();  
        }

        public async Task<IEnumerable<Transacao>> ListarTransacoesAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Categoria)
                .Include(t => t.Pessoa)
                .ToListAsync();
        }
    }
}
