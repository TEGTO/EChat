using AutoMapper;
using ChatApi.Data;
using ChatApi.Dtos;

namespace LibraryApi
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Message, MessageEntity>();
            CreateMap<MessageEntity, Message>();
        }
    }
}