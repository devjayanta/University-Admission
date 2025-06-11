using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University_Admission.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("delete from \"Users\" u where u.\"Id\"=1;");
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "FirstName", "Gender", "LastName", "LastUpdated", "MiddleName", "NationalityId", "PassportNo", "PasswordHash", "Role", "UserName" },
                values: new object[] { 1, new DateTime(2025, 6, 8, 11, 7, 57, 144, DateTimeKind.Utc), null, "", "", 0, "", null, null, 147, "", "jC/QELNB2ptODoAkm2FQUR9SqnDfxOojTZ2DiGmGFjzgN9aJfnZEr8gwIsFeK/WpRaVITuZVkxgkao8havk9PASM7VWhHb8ip6L9Wv6LqIYngcOWIIijlkfnB1Dokqu/Woru5nU8N2wiia3DdDCB8Jbu5kggG2O8Ht3fRsdW3og=:0yo2hUzJNzSkKC5h7k/CQjbi/hh823e0rcSSY9h9oVdD4iS9YokP3+rL4r2BQiUACzXOBq2AfiC8oqtKx76Bwg==", 0, "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
