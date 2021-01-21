using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace web.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roles_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    FirstName = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    LastName = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InitiatorId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    State = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Content = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Articles_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Articles_Users_InitiatorId",
                        column: x => x.InitiatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleUser",
                columns: table => new
                {
                    RolesId = table.Column<Guid>(type: "uuid", nullable: false),
                    UsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleUser", x => new { x.RolesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_RoleUser_Roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ArticleId = table.Column<Guid>(type: "uuid", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: false),
                    PerformerId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AssignmentDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    СompletionDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Description = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    Comment = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Users_PerformerId",
                        column: x => x.PerformerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "Name" },
                values: new object[] { new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"), "SuperAdminCompany" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CompanyId", "Name", "Type" },
                values: new object[] { new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"), new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"), "SuperAdmin", "SuperAdmin" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt" },
                values: new object[] { new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"), new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"), "admin@admin.com", "Admin", null, new byte[] { 102, 125, 27, 31, 218, 9, 201, 212, 156, 189, 232, 184, 171, 181, 194, 121, 19, 189, 117, 11, 198, 95, 114, 86, 230, 7, 130, 232, 73, 226, 24, 243, 247, 197, 248, 27, 117, 137, 24, 147, 109, 137, 214, 134, 174, 71, 219, 56, 200, 214, 72, 221, 15, 148, 205, 85, 149, 215, 179, 143, 248, 133, 155, 197 }, new byte[] { 65, 8, 139, 187, 235, 186, 141, 143, 33, 173, 221, 30, 46, 136, 135, 155, 94, 212, 14, 120, 155, 105, 182, 249, 213, 166, 55, 151, 86, 150, 126, 239, 100, 97, 116, 24, 23, 24, 17, 135, 18, 109, 126, 160, 78, 120, 205, 196, 198, 97, 141, 58, 237, 44, 9, 134, 116, 48, 145, 97, 146, 240, 98, 190, 230, 151, 55, 231, 39, 191, 178, 219, 68, 10, 27, 87, 204, 78, 151, 143, 77, 198, 125, 230, 172, 7, 142, 180, 235, 20, 114, 123, 38, 219, 226, 69, 175, 197, 123, 85, 111, 107, 113, 49, 127, 209, 161, 66, 35, 18, 237, 222, 143, 7, 39, 213, 71, 171, 204, 133, 32, 168, 25, 171, 105, 242, 138, 65 } });

            migrationBuilder.InsertData(
                table: "RoleUser",
                columns: new[] { "RolesId", "UsersId" },
                values: new object[] { new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"), new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f") });

            migrationBuilder.CreateIndex(
                name: "IX_Articles_CompanyId",
                table: "Articles",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_InitiatorId",
                table: "Articles",
                column: "InitiatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_CompanyId",
                table: "Roles",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleUser_UsersId",
                table: "RoleUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ArticleId",
                table: "Tasks",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_AuthorId",
                table: "Tasks",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CompanyId",
                table: "Tasks",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PerformerId",
                table: "Tasks",
                column: "PerformerId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanyId",
                table: "Users",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoleUser");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Articles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
