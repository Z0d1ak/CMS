using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace web.Migrations
{
    public partial class nojsonb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Articles",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "jsonb",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 251, 52, 240, 128, 54, 111, 59, 243, 164, 176, 5, 63, 226, 192, 51, 226, 13, 5, 181, 50, 73, 35, 130, 89, 18, 162, 97, 178, 8, 203, 4, 161, 251, 198, 101, 165, 39, 130, 200, 215, 200, 184, 200, 220, 247, 97, 157, 91, 226, 208, 220, 203, 9, 76, 251, 246, 167, 59, 58, 136, 235, 42, 65, 224 }, new byte[] { 219, 168, 13, 154, 24, 228, 251, 116, 162, 87, 216, 51, 190, 227, 65, 118, 84, 8, 104, 2, 44, 139, 221, 209, 81, 196, 140, 88, 84, 33, 127, 9, 88, 208, 81, 93, 201, 81, 109, 170, 42, 45, 70, 88, 246, 150, 99, 156, 30, 55, 43, 180, 223, 244, 180, 129, 142, 212, 179, 56, 40, 168, 54, 148, 117, 118, 240, 8, 252, 224, 79, 167, 28, 150, 33, 198, 89, 69, 194, 201, 79, 233, 81, 241, 168, 194, 113, 78, 90, 120, 185, 246, 110, 211, 178, 223, 223, 167, 7, 59, 3, 219, 136, 115, 46, 37, 46, 218, 166, 17, 7, 164, 107, 79, 132, 14, 2, 56, 9, 182, 76, 199, 214, 36, 248, 163, 176, 136 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Content",
                table: "Articles",
                type: "jsonb",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 112, 56, 236, 22, 206, 76, 245, 171, 79, 196, 11, 27, 18, 83, 129, 203, 226, 235, 47, 163, 234, 249, 128, 149, 42, 41, 184, 37, 227, 14, 9, 127, 200, 204, 55, 254, 157, 157, 35, 161, 53, 92, 36, 204, 59, 175, 55, 147, 64, 182, 82, 132, 255, 233, 37, 247, 201, 135, 78, 216, 99, 172, 197, 210 }, new byte[] { 111, 148, 13, 192, 142, 19, 125, 71, 65, 229, 64, 250, 98, 5, 245, 216, 202, 247, 255, 160, 167, 83, 99, 249, 81, 152, 76, 239, 60, 108, 56, 244, 208, 27, 21, 11, 223, 149, 141, 30, 139, 241, 56, 197, 214, 186, 181, 137, 251, 203, 254, 86, 35, 41, 15, 192, 222, 45, 170, 79, 216, 32, 144, 56, 89, 204, 208, 205, 159, 206, 32, 98, 235, 197, 88, 186, 27, 215, 167, 99, 72, 240, 97, 188, 2, 35, 222, 44, 250, 208, 53, 209, 203, 234, 27, 247, 18, 19, 80, 146, 97, 13, 75, 91, 64, 62, 37, 122, 57, 197, 126, 168, 99, 118, 244, 220, 17, 151, 243, 223, 31, 206, 54, 196, 171, 249, 39, 78 } });
        }
    }
}
