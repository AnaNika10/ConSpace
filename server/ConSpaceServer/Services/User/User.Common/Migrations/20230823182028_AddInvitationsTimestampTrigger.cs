using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Migrations
{
    /// <inheritdoc />
    public partial class AddInvitationsTimestampTrigger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE OR REPLACE FUNCTION updated_timestamp()
                RETURNS TRIGGER AS $$
                BEGIN
                NEW.timestamp = now(); 
                RETURN NEW;
                END;
                $$ language 'plpgsql';

                 CREATE TRIGGER update_timestamp_trigger BEFORE UPDATE
                    ON invites FOR EACH ROW EXECUTE PROCEDURE 
                    updated_timestamp();
                "
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DROP TRIGGER IF EXISTS update_timestamp_trigger ON invites;
                DROP FUNCTION IF EXISTS updated_timestamp;"
            );
        }
    }
}
