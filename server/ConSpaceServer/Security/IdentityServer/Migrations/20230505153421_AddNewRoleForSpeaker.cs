using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IdentityServer.Migrations
{
    public partial class AddNewRoleForSpeaker : Migration
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
                values: new object[] { "688ccc28-2e78-437b-b8bb-4e97cc48df38", "a25aaca9-cc48-4e6a-a86a-2fe0bd9a606a", "Speaker", "SPEAKER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cd3818e9-d8fb-4f2b-9ee4-6c27be3819b4", "d223bb2b-f3c7-4d72-a093-3dfd1ae0505f", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "de230606-f782-4669-a1a0-b5d189139ce3", "eab7af84-ad27-4be6-8f49-5d8059ef8ad4", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "688ccc28-2e78-437b-b8bb-4e97cc48df38");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cd3818e9-d8fb-4f2b-9ee4-6c27be3819b4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de230606-f782-4669-a1a0-b5d189139ce3");

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
