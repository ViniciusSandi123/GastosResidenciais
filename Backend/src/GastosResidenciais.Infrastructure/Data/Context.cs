using GastosResidenciais.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Infrastructure.Data
{
    public class Context : DbContext
    {
        public DbSet<Pessoa> Pessoas => Set<Pessoa>(); 
        public DbSet<Categoria> Categorias => Set<Categoria>(); 
        public DbSet<Transacao> Transacoes => Set<Transacao>(); 
        public Context(DbContextOptions<Context> dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.Property(e => e.Nome)
                    .HasMaxLength(50)
                    .IsRequired();
                
                entity.Property(e => e.Idade)
                    .HasMaxLength(3)
                    .IsRequired();
            });

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.Property(e => e.Descricao)
                    .HasMaxLength(200)
                    .IsRequired();

                entity.Property(e => e.Finalidade)
                    .IsRequired();
            });

            modelBuilder.Entity<Transacao>(entity =>
            {
                entity.Property(e => e.Descricao)
                    .HasMaxLength(200)
                    .IsRequired();

                entity.Property(e => e.Valor)
                    .HasMaxLength(10)
                    .IsRequired();

                entity.Property(e => e.Tipo)
                    .IsRequired();

                entity.HasOne(t => t.Pessoa)
                    .WithMany(p => p.Transacoes)
                    .HasForeignKey(t => t.IdPessoa)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.Categoria)
                    .WithMany(c => c.Transacoes)
                    .HasForeignKey(t => t.IdCategoria)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
