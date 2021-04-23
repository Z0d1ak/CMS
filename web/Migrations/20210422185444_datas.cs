using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace web.Migrations
{
    public partial class datas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Datas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PayLoad = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Datas", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 17, 247, 248, 161, 212, 182, 52, 253, 153, 221, 60, 93, 61, 178, 226, 202, 134, 8, 90, 216, 239, 191, 184, 145, 153, 117, 236, 104, 59, 184, 85, 116, 225, 219, 234, 80, 28, 234, 59, 126, 96, 62, 11, 45, 127, 145, 90, 37, 215, 223, 50, 66, 57, 72, 228, 24, 114, 190, 45, 22, 116, 14, 143, 233 }, new byte[] { 32, 95, 161, 211, 249, 141, 239, 84, 209, 229, 198, 109, 17, 230, 109, 15, 225, 11, 247, 136, 184, 166, 9, 29, 65, 161, 43, 100, 74, 32, 124, 200, 62, 201, 144, 158, 42, 48, 165, 217, 5, 80, 113, 215, 57, 43, 213, 123, 7, 215, 42, 117, 138, 246, 42, 168, 203, 52, 146, 15, 104, 79, 22, 113, 155, 50, 55, 156, 158, 78, 202, 248, 69, 248, 202, 1, 252, 229, 243, 144, 55, 78, 109, 163, 215, 197, 143, 4, 234, 117, 215, 129, 234, 164, 158, 191, 164, 248, 7, 227, 134, 138, 40, 28, 210, 143, 207, 22, 69, 110, 246, 51, 65, 19, 136, 17, 135, 161, 157, 144, 170, 162, 70, 3, 161, 189, 205, 236 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Datas");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 251, 52, 240, 128, 54, 111, 59, 243, 164, 176, 5, 63, 226, 192, 51, 226, 13, 5, 181, 50, 73, 35, 130, 89, 18, 162, 97, 178, 8, 203, 4, 161, 251, 198, 101, 165, 39, 130, 200, 215, 200, 184, 200, 220, 247, 97, 157, 91, 226, 208, 220, 203, 9, 76, 251, 246, 167, 59, 58, 136, 235, 42, 65, 224 }, new byte[] { 219, 168, 13, 154, 24, 228, 251, 116, 162, 87, 216, 51, 190, 227, 65, 118, 84, 8, 104, 2, 44, 139, 221, 209, 81, 196, 140, 88, 84, 33, 127, 9, 88, 208, 81, 93, 201, 81, 109, 170, 42, 45, 70, 88, 246, 150, 99, 156, 30, 55, 43, 180, 223, 244, 180, 129, 142, 212, 179, 56, 40, 168, 54, 148, 117, 118, 240, 8, 252, 224, 79, 167, 28, 150, 33, 198, 89, 69, 194, 201, 79, 233, 81, 241, 168, 194, 113, 78, 90, 120, 185, 246, 110, 211, 178, 223, 223, 167, 7, 59, 3, 219, 136, 115, 46, 37, 46, 218, 166, 17, 7, 164, 107, 79, 132, 14, 2, 56, 9, 182, 76, 199, 214, 36, 248, 163, 176, 136 } });
        }
    }
}
