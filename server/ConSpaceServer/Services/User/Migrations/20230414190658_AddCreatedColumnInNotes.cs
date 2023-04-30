using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedColumnInNotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "created",
                table: "notes",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "now()");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "updated",
                table: "notes",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "created",
                table: "notes");

            migrationBuilder.DropColumn(
                name: "updated",
                table: "notes");
        }
    }
}
