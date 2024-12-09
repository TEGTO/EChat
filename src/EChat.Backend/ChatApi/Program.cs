using ChatApi;
using ChatApi.Data;
using ChatApi.Hubs;
using DatabaseControl;

var builder = WebApplication.CreateBuilder(args);

#region DB

builder.Services.AddDbContextFactory<MessageDbContext>(builder.Configuration.GetConnectionString(Configuration.DATABASE_CONNECTION_STRING)!, "ChatApi");
builder.Services.AddRepository<MessageDbContext>();

#endregion

var allowedOriginsString = builder.Configuration[Configuration.ALLOWED_CORS_ORIGINS] ?? string.Empty;
var allowedOrigins = allowedOriginsString.Split(",", StringSplitOptions.RemoveEmptyEntries);

var corsPolicy = "AllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy, policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowCredentials()
            .AllowAnyMethod();
        if (builder.Environment.IsDevelopment())
        {
            policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors(corsPolicy);

if (app.Configuration[Configuration.EF_CREATE_DATABASE] == "true")
{
    await app.ConfigureDatabaseAsync<MessageDbContext>(CancellationToken.None);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapHub<ChatHub>("/chathub");

app.MapControllers();


await app.RunAsync();
