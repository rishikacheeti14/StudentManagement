using StudentApi.Data;
using StudentApi.Models;

namespace StudentApi.Data
{
    public static class DbSeeder
    {
        public static void Seed(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StudentDbContext>();

            if (!context.Students.Any())
            {
                context.Students.AddRange(
                    new Student { Name = "Revathi", Class = "10", Section = "A" },
                    new Student { Name = "Aayesha", Class = "9", Section = "B" }
                );

                context.SaveChanges();
            }
        }
    }
}
