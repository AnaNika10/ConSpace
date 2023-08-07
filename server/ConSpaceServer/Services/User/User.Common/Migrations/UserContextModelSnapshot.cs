﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using User.Common.Data;

#nullable disable

namespace User.Migrations
{
    [DbContext(typeof(UserContext))]
    partial class UserContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0-preview.2.23128.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("User.Common.Entities.Attendee", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("attendee_type");

                    b.HasKey("Id");

                    b.ToTable("attendee");
                });

            modelBuilder.Entity("User.Common.Entities.Invite", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("InviteeId")
                        .HasColumnType("uuid")
                        .HasColumnName("invitee_id");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<DateTimeOffset>("timestamp")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("timestamp")
                        .HasDefaultValueSql("now()");

                    b.HasKey("Id");

                    b.ToTable("invites");
                });

            modelBuilder.Entity("User.Common.Entities.Note", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Content")
                        .HasColumnType("text")
                        .HasColumnName("content");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.Property<DateTimeOffset>("created")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created")
                        .HasDefaultValueSql("now()");

                    b.Property<bool>("deleted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false)
                        .HasColumnName("deleted");

                    b.Property<DateTimeOffset?>("updated")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated");

                    b.HasKey("id");

                    b.HasIndex("UserId");

                    b.ToTable("notes");
                });

            modelBuilder.Entity("User.Common.Entities.Reminder", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("content")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("content");

                    b.Property<Guid>("eventId")
                        .HasColumnType("uuid")
                        .HasColumnName("eventId");

                    b.Property<DateTimeOffset>("timestamp")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("timestamp")
                        .HasDefaultValueSql("now()");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.Property<Guid>("userId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("id");

                    b.ToTable("reminders");
                });

            modelBuilder.Entity("User.Common.Entities.Seminar", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<int>("ConferenceRoomId")
                        .HasColumnType("integer")
                        .HasColumnName("conference_room_id");

                    b.Property<DateTimeOffset>("EndDateTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("end_date_time");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("location");

                    b.Property<List<string>>("Speakers")
                        .IsRequired()
                        .HasColumnType("text[]")
                        .HasColumnName("speakers");

                    b.Property<DateTimeOffset>("StartDateTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date_time");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("seminar");
                });

            modelBuilder.Entity("User.Common.Entities.Note", b =>
                {
                    b.HasOne("User.Common.Entities.Attendee", "user")
                        .WithMany("Notes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("User.Common.Entities.Seminar", b =>
                {
                    b.HasOne("User.Common.Entities.Attendee", "User")
                        .WithMany("Seminars")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("User.Common.Entities.Attendee", b =>
                {
                    b.Navigation("Notes");

                    b.Navigation("Seminars");
                });
#pragma warning restore 612, 618
        }
    }
}
