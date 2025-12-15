using FluentValidation;
using GastosResidenciais.Application.Validations;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application
{
    public static class ValidationExtensions
    {
        public static IServiceCollection AddValidators(this IServiceCollection services)
        {
            services.AddValidatorsFromAssemblyContaining<PessoaDTOValidation>();
            services.AddValidatorsFromAssemblyContaining<CategoriaDTOValidation>();
            services.AddValidatorsFromAssemblyContaining<TransacaoDTOValidation>();
            return services;
        }
    }
}
