using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobManagementProject.API.Migrations
{
    /// <inheritdoc />
    public partial class AddingloginData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Clients_ClientId",
                table: "Project");

            migrationBuilder.DropIndex(
                name: "IX_Project_ClientId",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Project");

            migrationBuilder.AddColumn<Guid>(
                name: "ClientsClientId",
                table: "Project",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BillingMethods",
                columns: table => new
                {
                    BillingMethodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingMethods", x => x.BillingMethodId);
                });

            migrationBuilder.CreateTable(
                name: "Currencies",
                columns: table => new
                {
                    CurrencyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurrencyCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.CurrencyId);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "04c82129-a393-43df-b7fd-bcba6273f99e",
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "ProjectManager", "PROJECTMANAGER" });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "408f1e13-3d19-4a10-8a4c-54d7ac97fc1b",
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "DeliveryManager", "DELIVERYMANAGER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f0488c17-668e-4e75-8c22-41c3c0781107", "f0488c17-668e-4e75-8c22-41c3c0781107", "GenericUser", "GENERICUSER" });

            migrationBuilder.CreateIndex(
                name: "IX_Project_ClientsClientId",
                table: "Project",
                column: "ClientsClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Clients_ClientsClientId",
                table: "Project",
                column: "ClientsClientId",
                principalTable: "Clients",
                principalColumn: "ClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_Clients_ClientsClientId",
                table: "Project");

            migrationBuilder.DropTable(
                name: "BillingMethods");

            migrationBuilder.DropTable(
                name: "Currencies");

            migrationBuilder.DropIndex(
                name: "IX_Project_ClientsClientId",
                table: "Project");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0488c17-668e-4e75-8c22-41c3c0781107");

            migrationBuilder.DropColumn(
                name: "ClientsClientId",
                table: "Project");

            migrationBuilder.AddColumn<Guid>(
                name: "ClientId",
                table: "Project",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "04c82129-a393-43df-b7fd-bcba6273f99e",
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "Reader", "READER" });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "408f1e13-3d19-4a10-8a4c-54d7ac97fc1b",
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "Writer", "WRITER" });

            migrationBuilder.CreateIndex(
                name: "IX_Project_ClientId",
                table: "Project",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Clients_ClientId",
                table: "Project",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
