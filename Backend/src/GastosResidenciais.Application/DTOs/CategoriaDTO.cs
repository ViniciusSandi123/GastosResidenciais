using GastosResidenciais.Domain.Helpers.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.DTOs
{
    public class CategoriaDTO
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public eFinalidade Finalidade { get; set; }
        public string FinalidadeDescricao { get; set; } = string.Empty;
    }
}
