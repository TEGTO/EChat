using AutoMapper;
using ChatApi.Data;
using ChatApi.Data.Repository;
using ChatApi.Dtos;
using ChatApi.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly IMessageRepository messageRepository;
        private readonly IMapper mapper;
        private readonly ITextAnalytics textAnalytics;

        public ChatHub(IMessageRepository messageRepository, IMapper mapper, ITextAnalytics textAnalytics)
        {
            this.messageRepository = messageRepository;
            this.mapper = mapper;
            this.textAnalytics = textAnalytics;
        }

        public override async Task OnConnectedAsync()
        {
            var allMessages = await messageRepository.GetMessagesAsync();

            await Clients.Caller.LoadMessages(allMessages.Select(mapper.Map<Message>));

            await base.OnConnectedAsync();
        }

        public async Task SendMessage(Message message)
        {
            var sentimentResult = await textAnalytics.AnalyzeSentimentAsync(message.Text);

            message.Sentiment = sentimentResult;

            await SaveMessageInDb(message);

            await Clients.All.ReceiveMessage(message);
        }

        private async Task SaveMessageInDb(Message message)
        {
            await messageRepository.AddMessageAsync(mapper.Map<MessageEntity>(message));
        }
    }
}
