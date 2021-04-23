using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace web.Migrations
{
    public partial class tg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayLoad",
                table: "Datas");

            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "Datas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PublishDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ArticleId = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Published = table.Column<bool>(type: "boolean", nullable: false),
                    Link = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublishDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PublishDatas_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TelegrammDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    BotName = table.Column<string>(type: "text", nullable: false),
                    ChanelName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TelegrammDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TelegrammDatas_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 46, 73, 137, 130, 182, 135, 90, 191, 239, 245, 177, 177, 175, 104, 239, 17, 195, 109, 226, 35, 65, 184, 34, 189, 187, 9, 185, 125, 182, 221, 211, 29, 159, 6, 65, 52, 64, 3, 82, 1, 141, 64, 91, 147, 121, 39, 215, 222, 254, 94, 223, 177, 86, 94, 115, 54, 183, 248, 106, 117, 38, 191, 92, 212 }, new byte[] { 18, 149, 129, 47, 153, 139, 92, 189, 69, 101, 73, 186, 45, 240, 168, 237, 91, 15, 10, 3, 178, 226, 14, 75, 72, 174, 230, 234, 11, 100, 108, 158, 167, 126, 254, 216, 89, 142, 97, 85, 146, 32, 20, 221, 195, 81, 28, 7, 117, 168, 37, 74, 139, 214, 76, 102, 69, 183, 21, 30, 1, 32, 109, 187, 2, 195, 15, 33, 140, 112, 11, 177, 114, 59, 220, 223, 38, 182, 127, 84, 237, 165, 92, 89, 58, 245, 33, 111, 163, 104, 228, 107, 218, 184, 250, 29, 73, 59, 147, 125, 80, 178, 148, 181, 207, 88, 32, 174, 96, 43, 221, 162, 201, 37, 109, 119, 9, 206, 63, 223, 41, 198, 119, 41, 4, 89, 188, 34 } });

            migrationBuilder.CreateIndex(
                name: "IX_PublishDatas_CompanyId",
                table: "PublishDatas",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_TelegrammDatas_CompanyId",
                table: "TelegrammDatas",
                column: "CompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PublishDatas");

            migrationBuilder.DropTable(
                name: "TelegrammDatas");

            migrationBuilder.DropColumn(
                name: "Extension",
                table: "Datas");

            migrationBuilder.AddColumn<byte[]>(
                name: "PayLoad",
                table: "Datas",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 17, 247, 248, 161, 212, 182, 52, 253, 153, 221, 60, 93, 61, 178, 226, 202, 134, 8, 90, 216, 239, 191, 184, 145, 153, 117, 236, 104, 59, 184, 85, 116, 225, 219, 234, 80, 28, 234, 59, 126, 96, 62, 11, 45, 127, 145, 90, 37, 215, 223, 50, 66, 57, 72, 228, 24, 114, 190, 45, 22, 116, 14, 143, 233 }, new byte[] { 32, 95, 161, 211, 249, 141, 239, 84, 209, 229, 198, 109, 17, 230, 109, 15, 225, 11, 247, 136, 184, 166, 9, 29, 65, 161, 43, 100, 74, 32, 124, 200, 62, 201, 144, 158, 42, 48, 165, 217, 5, 80, 113, 215, 57, 43, 213, 123, 7, 215, 42, 117, 138, 246, 42, 168, 203, 52, 146, 15, 104, 79, 22, 113, 155, 50, 55, 156, 158, 78, 202, 248, 69, 248, 202, 1, 252, 229, 243, 144, 55, 78, 109, 163, 215, 197, 143, 4, 234, 117, 215, 129, 234, 164, 158, 191, 164, 248, 7, 227, 134, 138, 40, 28, 210, 143, 207, 22, 69, 110, 246, 51, 65, 19, 136, 17, 135, 161, 157, 144, 170, 162, 70, 3, 161, 189, 205, 236 } });
        }
    }
}
