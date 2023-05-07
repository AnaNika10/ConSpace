using System;
using Common.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IdentityServer.Data.EntityTypeConfigurations;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole
            {
                Name = Roles.USER,
                NormalizedName = Roles.USER.Normalize().ToUpperInvariant()
            },
            new IdentityRole
            {
                Name = Roles.SPEAKER,
                NormalizedName = Roles.SPEAKER.Normalize().ToUpperInvariant()
            },
            new IdentityRole
            {
                Name = Roles.ADMINISTRATOR,
                NormalizedName = Roles.ADMINISTRATOR.Normalize().ToUpperInvariant()
            }
        );
    }
}
