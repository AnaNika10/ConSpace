﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using IdentityServer.Entities;
using IdentityServer.Data.EntityTypeConfigurations;

namespace IdentityServer.Data;

public class IdentityContext : IdentityDbContext<UserEntity>
{
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    public IdentityContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new RoleConfiguration());
        builder.ApplyConfiguration(new UserConfiguration());

    }
}
