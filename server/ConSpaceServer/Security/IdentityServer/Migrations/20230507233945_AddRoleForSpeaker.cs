using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IdentityServer.Migrations
{
    public partial class AddRoleForSpeaker : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "174cc2d4-b3d6-48aa-9876-d86d3a63b6e4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b979f20e-7be1-440a-8d3f-e7499773e477");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3a38c6d2-018b-4d21-aee3-1526c503e158", "20c8f845-03a5-468e-938a-4191dc08a614", "Speaker", "SPEAKER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "402f13d0-a4a1-4f1f-a150-7d85edfb28d9", "c081219a-2a28-4975-b85b-87a89947152f", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9bfd7a21-f2be-4619-92f8-640d89a00437", "f02bc9b4-6bcd-48d0-8128-fc92ebffa8cb", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3a38c6d2-018b-4d21-aee3-1526c503e158");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "402f13d0-a4a1-4f1f-a150-7d85edfb28d9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9bfd7a21-f2be-4619-92f8-640d89a00437");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "174cc2d4-b3d6-48aa-9876-d86d3a63b6e4", "0e4e443d-f892-4bf7-bb7f-af3162d8d3c9", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b979f20e-7be1-440a-8d3f-e7499773e477", "ba61feea-8c00-487a-a35f-387ec774e5c1", "Administrator", "ADMINISTRATOR" });
        }
    }
}
