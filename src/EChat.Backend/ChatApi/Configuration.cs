namespace ChatApi
{
    public static class Configuration
    {
        public static string ALLOWED_CORS_ORIGINS { get; } = "AllowedCORSOrigins";
        public static string DATABASE_CONNECTION_STRING { get; } = "MessageDb";
        public static string SIGNAL_CONNECTION_STRING { get; } = "Signal";
        public static string EF_CREATE_DATABASE { get; } = "EFCreateDatabase";
        public static string TEXT_ANALYTICS_ENDPOINT { get; } = "TextAnalytics:Endpoint";
        public static string TEXT_ANALYTICS_KEY { get; } = "TextAnalytics:ApiKey";
    }
}
