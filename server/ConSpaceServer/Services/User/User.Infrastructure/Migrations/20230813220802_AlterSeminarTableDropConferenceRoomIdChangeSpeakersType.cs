#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AlterSeminarTableDropConferenceRoomIdChangeSpeakersType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "conference_room_id",
                table: "seminar");

            migrationBuilder.DropColumn(
            name: "speaker_ids",
            table: "seminar");

            migrationBuilder.AddColumn<int[]>(
            name: "speaker_ids",
            table: "seminar",
            type: "integer[]",
            nullable: false
            );


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
            name: "speaker_ids",
            table: "seminar");


            migrationBuilder.AddColumn<Guid[]>(
            name: "speaker_ids",
            table: "seminar",
            type: "uuid[]",
            nullable: false
            );


            migrationBuilder.AddColumn<int>(
                name: "conference_room_id",
                table: "seminar",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
