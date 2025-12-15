using GastosResidenciais.Domain.Helpers.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public eFinalidade Finalidade { get; set; }
        public List<Transacao> Transacoes { get; set; }

        public Categoria() { }

        public static Categoria Criar(string descricao, eFinalidade eFinalidade)
        {
            return new Categoria() 
            { 
                Descricao = descricao,
                Finalidade = eFinalidade
            };
        }
    }
}
