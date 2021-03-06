﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using web.Db;

namespace web.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("text");

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
                            PasswordHash = new byte[] { 163, 155, 119, 134, 238, 200, 28, 240, 174, 242, 10, 244, 68, 133, 172, 238, 93, 91, 110, 182, 150, 5, 241, 239, 124, 164, 175, 130, 186, 93, 79, 185, 97, 181, 134, 138, 253, 93, 112, 181, 210, 175, 139, 81, 101, 172, 252, 132, 156, 142, 13, 129, 17, 6, 175, 153, 157, 96, 200, 198, 163, 40, 129, 250 },
                            PasswordSalt = new byte[] { 214, 90, 229, 191, 106, 167, 54, 117, 32, 116, 29, 102, 127, 229, 75, 49, 252, 86, 107, 143, 178, 125, 61, 66, 89, 174, 47, 55, 171, 166, 140, 216, 167, 69, 20, 208, 194, 200, 59, 124, 208, 128, 159, 31, 8, 11, 162, 41, 47, 163, 152, 238, 6, 180, 211, 88, 204, 104, 52, 207, 180, 234, 174, 31, 130, 182, 168, 40, 72, 125, 163, 108, 4, 149, 76, 20, 203, 201, 135, 150, 194, 177, 164, 49, 111, 200, 35, 233, 95, 209, 110, 249, 89, 136, 139, 6, 115, 9, 237, 80, 123, 106, 194, 133, 40, 88, 225, 125, 61, 216, 114, 188, 36, 207, 72, 51, 253, 80, 154, 160, 213, 63, 211, 236, 58, 251, 196, 16 }
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
