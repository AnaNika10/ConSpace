#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddEmailColumnInAttendeeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "attendee",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "attendee");
        }
    }
}
