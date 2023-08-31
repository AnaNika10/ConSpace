#nullable disable

using Microsoft.EntityFrameworkCore.Migrations;

namespace User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateUpdatedTrigger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DROP TRIGGER IF EXISTS updated_trigger ON notes;
                DROP FUNCTION IF EXISTS updated_timestamp;"
            );
        }
    }
}
