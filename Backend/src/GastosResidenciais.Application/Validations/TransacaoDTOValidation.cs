using FluentValidation;
using GastosResidenciais.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Validations
{
    public class TransacaoDTOValidation : AbstractValidator<TransacaoDTO>
    {
       public TransacaoDTOValidation()
        {
            RuleFor(x => x.Descricao)
                .NotEmpty().WithMessage("Descrição é obrigatória")
                .MaximumLength(200).WithMessage("Descrição pode ter no máximo 200 caracteres");

            RuleFor(x => x.Valor)
                .GreaterThan(0).WithMessage("O valor deve ser positivo")
                .PrecisionScale(18, 2, true).WithMessage("Valor deve ter no máximo 2 casas decimais");

            RuleFor(x => x.Tipo)
                .IsInEnum().WithMessage("Tipo inválido");

            RuleFor(x => x.IdCategoria)
                .NotEmpty().WithMessage("IdCategoria é obrigatório");

            RuleFor(x => x.IdPessoa)
                .NotEmpty().WithMessage("IdPessoa é obrigatório");
        }
    }
}
