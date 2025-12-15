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
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly Context _context;
        public CategoriaRepository(Context context) 
        {
            _context = context;
        }
        public async Task AdicionarCategoriaAsync(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Categoria>> ListarCategoriasAsync()
        {
            return await _context.Categorias
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Categoria?> ObterCategoriaPorIdAsync(int id)
        {
            return await _context.Categorias.FindAsync(id);
        }
    }
}
