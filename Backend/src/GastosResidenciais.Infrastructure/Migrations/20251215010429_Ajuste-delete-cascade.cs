using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GastosResidenciais.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Ajustedeletecascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes",
                column: "IdPessoa",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacoes_Pessoas_IdPessoa",
                table: "Transacoes",
                column: "IdPessoa",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
