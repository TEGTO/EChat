using ChatApi.Dtos;

namespace ChatApi.Hubs
{
    public interface IChatClient
    {
        public Task ReceiveMessage(Message message);
        public Task LoadMessages(IEnumerable<Message> messages);
    }
}
