﻿namespace ChatApi.Dtos
{
    public class Message
    {
        public string Name { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Sentiment { get; set; } = "Unknown";
    }
}
