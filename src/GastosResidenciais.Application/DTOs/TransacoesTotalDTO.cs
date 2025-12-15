using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.DTOs
{
    public class TransacoesTotalDTO
    {
        public List<TransacoesTotalPorPessoaDTO> Pessoas { get; set; }
        public List<TransacoesTotalPorCategoriaDTO> Categorias { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }

}
