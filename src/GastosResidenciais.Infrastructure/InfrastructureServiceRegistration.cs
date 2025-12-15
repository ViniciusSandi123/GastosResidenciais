using GastosResidenciais.Domain.Interfaces;
using GastosResidenciais.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace GastosResidenciais.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<IPessoaRepository, PessoaRepository>();
            services.AddScoped<ICategoriaRepository, CategoriaRepository>();
            services.AddScoped<ITransacaoRepository, TransacaoRepository>();

            return services;
        }
    }
}
