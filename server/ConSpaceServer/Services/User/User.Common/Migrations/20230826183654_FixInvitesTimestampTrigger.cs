using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Migrations
{
    /// <inheritdoc />
    public partial class FixInvitesTimestampTrigger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DROP TRIGGER IF EXISTS updated_trigger ON notes CASCADE;
                DROP FUNCTION IF EXISTS updated_timestamp CASCADE;"
            );
            migrationBuilder.Sql(
                @"CREATE OR REPLACE FUNCTION updated_timestamp()
                RETURNS TRIGGER AS $$
                BEGIN
                NEW.updated = now(); 
                RETURN NEW;
                END;
                $$ language 'plpgsql';

                 CREATE TRIGGER updated_changetimestamp BEFORE UPDATE
                    ON notes FOR EACH ROW EXECUTE PROCEDURE 
                    updated_timestamp();
                "
            );
            migrationBuilder.Sql(
                @"DROP TRIGGER IF EXISTS update_timestamp_trigger ON invites CASCADE;
                DROP FUNCTION IF EXISTS updated_timestamp CASCADE;"
            );
            migrationBuilder.Sql(
                @"CREATE OR REPLACE FUNCTION updated_invites_timestamp()
                RETURNS TRIGGER AS $$
                BEGIN
                NEW.timestamp = now(); 
                RETURN NEW;
                END;
                $$ language 'plpgsql';

                 CREATE TRIGGER update_timestamp_trigger BEFORE UPDATE
                    ON invites FOR EACH ROW EXECUTE PROCEDURE 
                    updated_invites_timestamp();
                "
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DROP TRIGGER IF EXISTS updated_trigger ON notes;
                DROP FUNCTION IF EXISTS updated_timestamp;"
            );
            migrationBuilder.Sql(
                @"DROP TRIGGER IF EXISTS update_timestamp_trigger ON invites;
                DROP FUNCTION IF EXISTS updated_invites_timestamp;"
            );
        }
    }
}
