﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using web.Db;

namespace web.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210423104950_tg")]
    partial class tg
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.Property<Guid>("RolesId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UsersId")
                        .HasColumnType("uuid");

                    b.HasKey("RolesId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("RoleUser");

                    b.HasData(
                        new
                        {
                            RolesId = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                            UsersId = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f")
                        });
                });

            modelBuilder.Entity("web.Entities.Article", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("InitiatorId")
                        .HasColumnType("uuid");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("InitiatorId");

                    b.ToTable("Articles");
                });

            modelBuilder.Entity("web.Entities.Company", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.HasKey("Id");

                    b.ToTable("Companies");

                    b.HasData(
                        new
                        {
                            Id = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                            Name = "SuperAdminCompany"
                        });
                });

            modelBuilder.Entity("web.Entities.Data", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Extension")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Datas");
                });

            modelBuilder.Entity("web.Entities.PublishData", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ArticleId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("Link")
                        .HasColumnType("boolean");

                    b.Property<bool>("Published")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("PublishDatas");
                });

            modelBuilder.Entity("web.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                            CompanyId = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                            Name = "SuperAdmin",
                            Type = "SuperAdmin"
                        });
                });

            modelBuilder.Entity("web.Entities.TelegrammData", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BotName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ChanelName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("TelegrammDatas");
                });

            modelBuilder.Entity("web.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

                    b.Property<string>("LastName")
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                            CompanyId = new Guid("face1e55-b0d5-1ab5-1e55-bef001ed100f"),
                            Email = "admin@admin.com",
                            FirstName = "Admin",
                            PasswordHash = new byte[] { 46, 73, 137, 130, 182, 135, 90, 191, 239, 245, 177, 177, 175, 104, 239, 17, 195, 109, 226, 35, 65, 184, 34, 189, 187, 9, 185, 125, 182, 221, 211, 29, 159, 6, 65, 52, 64, 3, 82, 1, 141, 64, 91, 147, 121, 39, 215, 222, 254, 94, 223, 177, 86, 94, 115, 54, 183, 248, 106, 117, 38, 191, 92, 212 },
                            PasswordSalt = new byte[] { 18, 149, 129, 47, 153, 139, 92, 189, 69, 101, 73, 186, 45, 240, 168, 237, 91, 15, 10, 3, 178, 226, 14, 75, 72, 174, 230, 234, 11, 100, 108, 158, 167, 126, 254, 216, 89, 142, 97, 85, 146, 32, 20, 221, 195, 81, 28, 7, 117, 168, 37, 74, 139, 214, 76, 102, 69, 183, 21, 30, 1, 32, 109, 187, 2, 195, 15, 33, 140, 112, 11, 177, 114, 59, 220, 223, 38, 182, 127, 84, 237, 165, 92, 89, 58, 245, 33, 111, 163, 104, 228, 107, 218, 184, 250, 29, 73, 59, 147, 125, 80, 178, 148, 181, 207, 88, 32, 174, 96, 43, 221, 162, 201, 37, 109, 119, 9, 206, 63, 223, 41, 198, 119, 41, 4, 89, 188, 34 }
                        });
                });

            modelBuilder.Entity("web.Entities.WfTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("ArticleId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("AssignmentDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<string>("Comment")
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasMaxLength(512)
                        .HasColumnType("character varying(512)");

                    b.Property<Guid?>("ParentTaskId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("PerformerId")
                        .HasColumnType("uuid");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("СompletionDate")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.HasIndex("ArticleId");

                    b.HasIndex("AuthorId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("PerformerId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("RoleUser", b =>
                {
                    b.HasOne("web.Entities.Role", null)
                        .WithMany()
                        .HasForeignKey("RolesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("web.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("web.Entities.Article", b =>
                {
                    b.HasOne("web.Entities.Company", "Company")
                        .WithMany("Articles")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("web.Entities.User", "Initiator")
                        .WithMany("InitiatedArticles")
                        .HasForeignKey("InitiatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Initiator");
                });

            modelBuilder.Entity("web.Entities.PublishData", b =>
                {
                    b.HasOne("web.Entities.Company", "Company")
                        .WithMany("PublishDatas")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("web.Entities.Role", b =>
                {
                    b.HasOne("web.Entities.Company", "Company")
                        .WithMany("Roles")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("web.Entities.TelegrammData", b =>
                {
                    b.HasOne("web.Entities.Company", "Company")
                        .WithMany("TelegrammDatas")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("web.Entities.User", b =>
                {
                    b.HasOne("web.Entities.Company", "Company")
                        .WithMany("Users")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("web.Entities.WfTask", b =>
                {
                    b.HasOne("web.Entities.Article", "Article")
                        .WithMany("Tasks")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("web.Entities.User", "Author")
                        .WithMany("CreatedTasks")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("web.Entities.Company", "Company")
                        .WithMany("Tasks")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("web.Entities.User", "Performer")
                        .WithMany("PerfomingTasks")
                        .HasForeignKey("PerformerId");

                    b.Navigation("Article");

                    b.Navigation("Author");

                    b.Navigation("Company");

                    b.Navigation("Performer");
                });

            modelBuilder.Entity("web.Entities.Article", b =>
                {
                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("web.Entities.Company", b =>
                {
                    b.Navigation("Articles");

                    b.Navigation("PublishDatas");

                    b.Navigation("Roles");

                    b.Navigation("Tasks");

                    b.Navigation("TelegrammDatas");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("web.Entities.User", b =>
                {
                    b.Navigation("CreatedTasks");

                    b.Navigation("InitiatedArticles");

                    b.Navigation("PerfomingTasks");
                });
#pragma warning restore 612, 618
        }
    }
}
