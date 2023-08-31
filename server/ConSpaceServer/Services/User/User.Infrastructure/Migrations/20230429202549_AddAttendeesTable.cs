#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAttendeesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "attendee",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    attendee_type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_attendee", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_notes_user_id",
                table: "notes",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_notes_attendee_user_id",
                table: "notes",
                column: "user_id",
                principalTable: "attendee",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_notes_attendee_user_id",
                table: "notes");

            migrationBuilder.DropTable(
                name: "attendee");

            migrationBuilder.DropIndex(
                name: "IX_notes_user_id",
                table: "notes");
        }
    }
}
