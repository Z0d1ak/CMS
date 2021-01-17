using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace web.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyID = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_roles_companies_CompanyID",
                        column: x => x.CompanyID,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyID = table.Column<Guid>(type: "uuid", nullable: false),
                    Login = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    Email = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    FirstName = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    LastName = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_users_companies_CompanyID",
                        column: x => x.CompanyID,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "articles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InitiatorID = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyID = table.Column<Guid>(type: "uuid", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    State = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    Content = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_articles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_articles_companies_CompanyID",
                        column: x => x.CompanyID,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_articles_users_InitiatorID",
                        column: x => x.InitiatorID,
                        principalTable: "users",
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
                        name: "FK_RoleUser_roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleUser_users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyID = table.Column<Guid>(type: "uuid", nullable: false),
                    ArticleID = table.Column<Guid>(type: "uuid", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: false),
                    PerformerId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    TakenToWorkDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Description = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    Comment = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tasks_articles_ArticleID",
                        column: x => x.ArticleID,
                        principalTable: "articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tasks_companies_CompanyID",
                        column: x => x.CompanyID,
                        principalTable: "companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tasks_users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tasks_users_PerformerId",
                        column: x => x.PerformerId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_articles_CompanyID",
                table: "articles",
                column: "CompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_articles_InitiatorID",
                table: "articles",
                column: "InitiatorID");

            migrationBuilder.CreateIndex(
                name: "IX_roles_CompanyID",
                table: "roles",
                column: "CompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_RoleUser_UsersId",
                table: "RoleUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_ArticleID",
                table: "tasks",
                column: "ArticleID");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_AuthorId",
                table: "tasks",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_CompanyID",
                table: "tasks",
                column: "CompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_tasks_PerformerId",
                table: "tasks",
                column: "PerformerId");

            migrationBuilder.CreateIndex(
                name: "IX_users_CompanyID",
                table: "users",
                column: "CompanyID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoleUser");

            migrationBuilder.DropTable(
                name: "tasks");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "articles");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "companies");
        }
    }
}
