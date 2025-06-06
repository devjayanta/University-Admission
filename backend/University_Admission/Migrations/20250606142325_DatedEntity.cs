using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University_Admission.Migrations
{
    /// <inheritdoc />
    public partial class DatedEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "UserProgramRequirements",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastUpdated",
                table: "UserProgramProcesses",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "UserProgramProcesses",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "UniversityPrograms",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "UniversityPrograms",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "UniversityPrograms",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Universities",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Universities",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Universities",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "ProgramRequirements",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "ProgramRequirements",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "ProgramRequirements",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Notification",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Notification",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Announcements",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Announcements",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "UserProgramProcesses");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "UniversityPrograms");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "UniversityPrograms");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "UniversityPrograms");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Universities");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Universities");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Universities");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "ProgramRequirements");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "ProgramRequirements");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "ProgramRequirements");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Notification");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Announcements");

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "UserProgramRequirements",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastUpdated",
                table: "UserProgramProcesses",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);
        }
    }
}
