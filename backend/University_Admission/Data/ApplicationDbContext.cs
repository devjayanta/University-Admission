using Microsoft.EntityFrameworkCore;
using University_Admission.Data.SeedData;
using University_Admission.Domain.Entities.CommonEntities;
using University_Admission.Domain.Entities.ProcessEntities;
using University_Admission.Domain.Entities.ProgramEntities;
using University_Admission.Domain.Entities.UserEntities;

namespace University_Admission.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<UniversityProgram> UniversityPrograms { get; set; }
        public DbSet<ProgramRequirement> ProgramRequirements { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<UserProgramProcess> UserProgramProcesses { get; set; }
        public DbSet<UserProgramRequirement> UserProgramRequirements { get; set; }
        public DbSet<UserDocument> UserDocuments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UniversityProgram>().Property(x => x.Fee).HasPrecision(18, 2);

            builder.Entity<Country>().HasData(CountrySeed.Countries);

            builder.Entity<Document>().HasData(DocumentSeed.Documents);

            builder
                .Entity<UserProgramProcess>()
                .HasOne(x => x.ActionUser)
                .WithMany()
                .HasForeignKey(x => x.ActionUserId);

            builder.Entity<User>().HasIndex(x => x.UserName).IsUnique();
        }
    }
}
