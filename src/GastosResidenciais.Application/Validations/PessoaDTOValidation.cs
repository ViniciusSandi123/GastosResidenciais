using FluentValidation;
using GastosResidenciais.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Validations
{
    public class PessoaDTOValidation : AbstractValidator<PessoaDTO>
    {
        public PessoaDTOValidation()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("Nome é obrigatório")
                .MaximumLength(50).WithMessage("Nome pode ter no máximo 50 caracteres");

            RuleFor(x => x.Idade)
                .GreaterThan(0).WithMessage("Idade deve ser positivo")
                .LessThanOrEqualTo(100).WithMessage("Idade deve ser menor ou igual a 100")
                .Must(x => x.ToString().Length <= 3).WithMessage("Idade pode ter no máximo 3 caracteres");
        }
    }
}
