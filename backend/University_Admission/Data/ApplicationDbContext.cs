using Microsoft.EntityFrameworkCore;

namespace University_Admission.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) {}

        //public DbSet<User> users { get; set; }
    }
}
