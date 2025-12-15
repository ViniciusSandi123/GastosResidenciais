using FluentValidation;
using GastosResidenciais.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Validations
{
    public class CategoriaDTOValidation : AbstractValidator<CategoriaDTO>
    {
        public CategoriaDTOValidation()
        {
            RuleFor(x => x.Descricao)
                .NotEmpty().WithMessage("Descrição é obrigatória")
                .MaximumLength(200).WithMessage("Descrição pode ter no máximo 200 caracteres");
            
            RuleFor(x => x.Finalidade)
                .IsInEnum().WithMessage("Finalidade inválida");
        }
    }
}
