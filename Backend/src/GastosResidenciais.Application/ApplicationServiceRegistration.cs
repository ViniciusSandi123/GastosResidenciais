using GastosResidenciais.Application.Interfaces;
using GastosResidenciais.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GastosResidenciais.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IPessoaService, PessoaService>();
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<ITransacaoService, TransacaoService>();

            return services;
        }
    }
}
