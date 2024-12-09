using AutoMapper;
using ChatApi.Data;
using ChatApi.Data.Repository;
using ChatApi.Dtos;
using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly IMessageRepository messageRepository;
        private readonly IMapper mapper;

        public ChatHub(IMessageRepository messageRepository, IMapper mapper)
        {
            this.messageRepository = messageRepository;
            this.mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            var allMessages = await messageRepository.GetMessagesAsync(CancellationToken.None);

            await Clients.Caller.LoadMessages(allMessages.Select(mapper.Map<Message>));

            await base.OnConnectedAsync();
        }

        public async Task SendMessage(Message message)
        {
            await SaveMessageInDb(message);

            await Clients.All.ReceiveMessage(message);
        }

        private async Task SaveMessageInDb(Message message)
        {
            await messageRepository.AddMessageAsync(mapper.Map<MessageEntity>(message), CancellationToken.None);
        }
    }
}
