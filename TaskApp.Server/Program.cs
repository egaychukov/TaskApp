using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApp.Server.Controllers;
using TaskApp.Server.DataLayer;
using TaskApp.Server.Filters;
using TaskApp.Server.Services;
using TaskApp.Server.Validators;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<UserTasksDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("TasksDatabase"))
);

builder.Services.AddCors(options => 
{
    options.AddPolicy("CustomPolicy", 
        builder => builder.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin());
});

// AutoMapper
builder.Services.AddAutoMapper(options => options.AddProfile<MappingProfile>());

// Repositories
builder.Services.AddTransient<IUserTasksRepository, UserTasksRepository>();
builder.Services.AddTransient<IUserTaskTypesRepository, UserTaskTypesRepository>();

// Services
builder.Services.AddTransient<IUserTasksService, UserTasksService>();
builder.Services.AddTransient<IUserTaskTypesService, UserTaskTypesService>();

// Validators
builder.Services.AddScoped<IValidator<CreateUserTaskDto>, UserTaskValidator>();
builder.Services.AddScoped<IValidator<PaginationDto>, PaginationValidator>();

// Filters
builder.Services.AddScoped<TaskAsyncActionFilter>();
builder.Services.AddScoped<PaginationValidationFilter>();
builder.Services.AddScoped<NotFoundActionFilter>();


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

app.UseCors("CustomPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
