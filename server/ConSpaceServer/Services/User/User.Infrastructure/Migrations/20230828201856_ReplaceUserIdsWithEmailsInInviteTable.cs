#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceUserIdsWithEmailsInInviteTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "invitee_id",
                table: "invites");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "invites");

            migrationBuilder.AddColumn<string>(
                name: "invitee_email",
                table: "invites",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "user_email",
                table: "invites",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "invitee_email",
                table: "invites");

            migrationBuilder.DropColumn(
                name: "user_email",
                table: "invites");

            migrationBuilder.AddColumn<Guid>(
                name: "invitee_id",
                table: "invites",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "invites",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
