using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GastosResidenciais.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Ajustevalordecimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Valor",
                table: "Transacoes",
                type: "TEXT",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(float),
                oldType: "REAL",
                oldMaxLength: 10);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Valor",
                table: "Transacoes",
                type: "REAL",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT",
                oldMaxLength: 10);
        }
    }
}
