using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Migrations
{
    /// <inheritdoc />
    public partial class AddTitleLocationStartAndEndDateOfSeminar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "date_time_of_seminar",
                table: "seminar",
                newName: "start_date_time");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "end_date_time",
                table: "seminar",
                type: "timestamp with time zone",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "location",
                table: "seminar",
                type: "text",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "seminar",
                type: "text",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "end_date_time",
                table: "seminar");

            migrationBuilder.DropColumn(
                name: "location",
                table: "seminar");

            migrationBuilder.DropColumn(
                name: "title",
                table: "seminar");

            migrationBuilder.RenameColumn(
                name: "start_date_time",
                table: "seminar",
                newName: "date_time_of_seminar");
        }
    }
}
