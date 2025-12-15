using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Domain.Helpers.Enums
{
    public enum eFinalidade
    {
        [Description("Despesa")]
        Despesa = 1,
        [Description("Receita")]
        Receita = 2,
        [Description("Ambos")]
        Ambos = 3
    }
}
