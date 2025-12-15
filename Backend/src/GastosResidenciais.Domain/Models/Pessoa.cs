using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public List<Transacao> Transacoes { get; set; }

        public Pessoa() { }

        public static Pessoa Criar(string nome, int idade)
        {
            return new Pessoa
            {
                Nome = nome,
                Idade = idade
            };
        }
    }
}
