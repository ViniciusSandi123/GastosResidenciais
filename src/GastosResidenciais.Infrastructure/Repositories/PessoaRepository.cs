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
    public class PessoaRepository : IPessoaRepository
    {
        private readonly Context _context;
        public PessoaRepository(Context context)
        {
            _context = context;
        }

        public async Task AdicionarPessoaAsync(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
        }

        public async Task DeletarPessoaAsync(Pessoa pessoa)
        {
            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Pessoa>> ListarPessoasAsync()
        {
            return await _context.Pessoas
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Pessoa?> ObterPessoaPorIdAsync(int id)
        {
            return await _context.Pessoas.FindAsync(id);
        }
    }
}
