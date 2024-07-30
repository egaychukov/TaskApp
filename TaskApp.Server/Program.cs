using Microsoft.EntityFrameworkCore;
using TaskApp.Server.DataLayer;
using TaskApp.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<UserTasksDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("TasksDatabase"))
);

builder.Services.AddTransient<IUserTasksRepository, UserTasksRepository>();
builder.Services.AddTransient<IUserTaskTypesRepository, UserTaskTypesRepository>();
builder.Services.AddTransient<IUserTasksService, UserTasksService>();
builder.Services.AddTransient<IUserTaskTypesService, UserTaskTypesService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
