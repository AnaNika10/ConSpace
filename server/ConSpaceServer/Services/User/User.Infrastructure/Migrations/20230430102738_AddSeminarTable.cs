#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSeminarTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "seminar",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    speakers = table.Column<List<string>>(type: "text[]", nullable: false),
                    conference_room_id = table.Column<Guid>(type: "uuid", nullable: false),
                    date_time_of_seminar = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_seminar", x => x.id);
                    table.ForeignKey(
                        name: "FK_seminar_attendee_user_id",
                        column: x => x.user_id,
                        principalTable: "attendee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_seminar_user_id",
                table: "seminar",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "seminar");
        }
    }
}
