using GastosResidenciais.Domain.Helpers.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.DTOs
{
    public class TransacaoDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public eTipo Tipo { get; set; }
        public string TipoDescricao { get; set; }
        public int IdCategoria { get; set; }
        public CategoriaDTO Categoria { get; set; }
        public int IdPessoa { get; set; }
        public PessoaDTO Pessoa { get; set; }
    }
}
