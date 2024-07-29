using Microsoft.EntityFrameworkCore;

namespace TaskApp.Server.DataLayer;

public class UserTasksDbContext : DbContext
{
    public DbSet<UserTask> UserTasks { get; set; }
    public DbSet<UserTaskType> UserTaskTypes { get; set; }

    public UserTasksDbContext(DbContextOptions<UserTasksDbContext> options)
        : base (options) {}
}