namespace ChatApi
{
    public static class Configuration
    {
        public static string ALLOWED_CORS_ORIGINS { get; } = "AllowedCORSOrigins";
        public static string DATABASE_CONNECTION_STRING { get; } = "MessageDb";
        public static string EF_CREATE_DATABASE { get; } = "EFCreateDatabase";
    }
}
