using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace web.Migrations
{
    public partial class tg2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Link",
                table: "PublishDatas",
                type: "text",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 163, 155, 119, 134, 238, 200, 28, 240, 174, 242, 10, 244, 68, 133, 172, 238, 93, 91, 110, 182, 150, 5, 241, 239, 124, 164, 175, 130, 186, 93, 79, 185, 97, 181, 134, 138, 253, 93, 112, 181, 210, 175, 139, 81, 101, 172, 252, 132, 156, 142, 13, 129, 17, 6, 175, 153, 157, 96, 200, 198, 163, 40, 129, 250 }, new byte[] { 214, 90, 229, 191, 106, 167, 54, 117, 32, 116, 29, 102, 127, 229, 75, 49, 252, 86, 107, 143, 178, 125, 61, 66, 89, 174, 47, 55, 171, 166, 140, 216, 167, 69, 20, 208, 194, 200, 59, 124, 208, 128, 159, 31, 8, 11, 162, 41, 47, 163, 152, 238, 6, 180, 211, 88, 204, 104, 52, 207, 180, 234, 174, 31, 130, 182, 168, 40, 72, 125, 163, 108, 4, 149, 76, 20, 203, 201, 135, 150, 194, 177, 164, 49, 111, 200, 35, 233, 95, 209, 110, 249, 89, 136, 139, 6, 115, 9, 237, 80, 123, 106, 194, 133, 40, 88, 225, 125, 61, 216, 114, 188, 36, 207, 72, 51, 253, 80, 154, 160, 213, 63, 211, 236, 58, 251, 196, 16 } });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Link",
                table: "PublishDatas",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 46, 73, 137, 130, 182, 135, 90, 191, 239, 245, 177, 177, 175, 104, 239, 17, 195, 109, 226, 35, 65, 184, 34, 189, 187, 9, 185, 125, 182, 221, 211, 29, 159, 6, 65, 52, 64, 3, 82, 1, 141, 64, 91, 147, 121, 39, 215, 222, 254, 94, 223, 177, 86, 94, 115, 54, 183, 248, 106, 117, 38, 191, 92, 212 }, new byte[] { 18, 149, 129, 47, 153, 139, 92, 189, 69, 101, 73, 186, 45, 240, 168, 237, 91, 15, 10, 3, 178, 226, 14, 75, 72, 174, 230, 234, 11, 100, 108, 158, 167, 126, 254, 216, 89, 142, 97, 85, 146, 32, 20, 221, 195, 81, 28, 7, 117, 168, 37, 74, 139, 214, 76, 102, 69, 183, 21, 30, 1, 32, 109, 187, 2, 195, 15, 33, 140, 112, 11, 177, 114, 59, 220, 223, 38, 182, 127, 84, 237, 165, 92, 89, 58, 245, 33, 111, 163, 104, 228, 107, 218, 184, 250, 29, 73, 59, 147, 125, 80, 178, 148, 181, 207, 88, 32, 174, 96, 43, 221, 162, 201, 37, 109, 119, 9, 206, 63, 223, 41, 198, 119, 41, 4, 89, 188, 34 } });
        }
    }
}
