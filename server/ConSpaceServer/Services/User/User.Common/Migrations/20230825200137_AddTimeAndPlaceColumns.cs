using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Migrations
{
    /// <inheritdoc />
    public partial class AddTimeAndPlaceColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "place",
                table: "invites",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "time",
                table: "invites",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "place",
                table: "invites");

            migrationBuilder.DropColumn(
                name: "time",
                table: "invites");
        }
    }
}
