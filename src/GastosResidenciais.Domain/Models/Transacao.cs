using GastosResidenciais.Domain.Helpers.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor {  get; set; }
        public eTipo Tipo { get; set; }
        public int IdCategoria { get; set; }
        public Categoria Categoria { get; set; }
        public int IdPessoa { get; set; }
        public Pessoa Pessoa { get; set; }
        
        public Transacao() { }

        public static Transacao Criar( 
            string descricao, 
            decimal valor, 
            eTipo tipo,
            int idCategoria,
            int idPessoa)
        {
            return new Transacao
            {
                Descricao = descricao,
                Valor = valor,
                Tipo = tipo,
                IdCategoria = idCategoria,
                IdPessoa = idPessoa
            };
        }
    }
}
