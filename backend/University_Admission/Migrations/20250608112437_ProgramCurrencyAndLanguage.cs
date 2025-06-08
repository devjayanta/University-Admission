using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University_Admission.Migrations
{
    /// <inheritdoc />
    public partial class ProgramCurrencyAndLanguage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "UserProgramRequirements",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "UniversityPrograms",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Language",
                table: "UniversityPrograms",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Value",
                table: "ProgramRequirements",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "UniversityPrograms");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "UniversityPrograms");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "ProgramRequirements");

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "UserProgramRequirements",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(2000)",
                oldMaxLength: 2000,
                oldNullable: true);
        }
    }
}
