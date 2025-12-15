using AutoMapper;
using GastosResidenciais.Application.DTOs;
using GastosResidenciais.Domain.Helpers;
using GastosResidenciais.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GastosResidenciais.Application.Mappings
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<PessoaDTO, Pessoa>().ReverseMap();

            CreateMap<CategoriaDTO, Categoria>();
            CreateMap<Categoria, CategoriaDTO>()
                .ForMember(dest => dest.FinalidadeDescricao,
                            opt => opt.MapFrom(src => src.Finalidade.GetDescription()));

            CreateMap<TransacaoDTO, Transacao>();
            CreateMap<Transacao, TransacaoDTO>()
                .ForMember(dest => dest.TipoDescricao,
                            opt => opt.MapFrom(src => src.Tipo.GetDescription()));
        }
    }
}
