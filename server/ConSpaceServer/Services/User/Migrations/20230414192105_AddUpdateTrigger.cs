using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace User.Migrations
{
    /// <inheritdoc />
    public partial class AddUpdateTrigger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"CREATE FUNCTION updated_timestamp() RETURNS trigger AS $updated_timestamp$
                    BEGIN
                        IF (TG_OP = 'UPDATE') THEN 
                            UPDATE notes
                                SET updated=now();
                        END IF;
                        RETURN NULL;
                    END;
                $updated_timestamp$ LANGUAGE plpgsql;
                CREATE TRIGGER update_trigger AFTER UPDATE ON notes EXECUTE FUNCTION updated_timestamp();
                "
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"DROP TRIGGER IF EXISTS update_trigger ON notes;
                DROP FUNCTION IF EXISTS updated_timestamp;"
            );
        }
    }
}
