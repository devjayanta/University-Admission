using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace University_Admission.Migrations
{
    /// <inheritdoc />
    public partial class UserProcessActions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ActionUserId",
                table: "UserProgramProcesses",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "UserProgramProcesses",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "UserProgramProcesses",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProgramProcesses_ActionUserId",
                table: "UserProgramProcesses",
                column: "ActionUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProgramProcesses_Users_ActionUserId",
                table: "UserProgramProcesses",
                column: "ActionUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProgramProcesses_Users_ActionUserId",
                table: "UserProgramProcesses");

            migrationBuilder.DropIndex(
                name: "IX_UserProgramProcesses_ActionUserId",
                table: "UserProgramProcesses");

            migrationBuilder.DropColumn(
                name: "ActionUserId",
                table: "UserProgramProcesses");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "UserProgramProcesses");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserProgramProcesses");
        }
    }
}
