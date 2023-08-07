using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Migrations
{
    /// <inheritdoc />
    public partial class ChangeConferenceRoomIdType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "conference_room_id",
                table: "seminar"
            );
            migrationBuilder.AddColumn<int>(
                name: "conference_room_id",
                table: "seminar",
                type: "integer",
                nullable: false
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "conference_room_id",
                table: "seminar"
            );
            migrationBuilder.AddColumn<int>(
                name: "conference_room_id",
                table: "seminar",
                type: "uuid",
                nullable: false
            );
        }
    }
}
