using Microsoft.EntityFrameworkCore;
using University_Admission.Data.SeedData;
using University_Admission.Domain.Entities.CommonEntities;
using University_Admission.Domain.Entities.ProcessEntities;
using University_Admission.Domain.Entities.ProgramEntities;
using University_Admission.Domain.Entities.UserEntities;
using University_Admission.Domain.Enum;

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

            // seed admin user username: 'admin', password: 'admin1234'
            builder
                .Entity<User>()
                .HasData(
                    new User(
                        1,
                        "admin",
                        "",
                        null,
                        "",
                        "",
                        147,
                        Gender.Male,
                        "",
                        Role.Admin,
                        "jC/QELNB2ptODoAkm2FQUR9SqnDfxOojTZ2DiGmGFjzgN9aJfnZEr8gwIsFeK/WpRaVITuZVkxgkao8havk9PASM7VWhHb8ip6L9Wv6LqIYngcOWIIijlkfnB1Dokqu/Woru5nU8N2wiia3DdDCB8Jbu5kggG2O8Ht3fRsdW3og=:0yo2hUzJNzSkKC5h7k/CQjbi/hh823e0rcSSY9h9oVdD4iS9YokP3+rL4r2BQiUACzXOBq2AfiC8oqtKx76Bwg==",
                        DateTime.Parse("2025-06-08 16:52:57.144 +0545").ToUniversalTime()
                    )
                );

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
