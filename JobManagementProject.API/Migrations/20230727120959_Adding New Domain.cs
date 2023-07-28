using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobManagementProject.API.Migrations
{
    /// <inheritdoc />
    public partial class AddingNewDomain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjectHeadId",
                table: "Project",
                newName: "DeliveryManagerId");

            migrationBuilder.AddColumn<string>(
                name: "CurrencyName",
                table: "Currencies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Sequence",
                table: "Currencies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Code",
                table: "BillingMethods",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sequence",
                table: "BillingMethods",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "408f1e13-3d19-4a10-8a4c-54d7ac97fc1b",
                column: "NormalizedName",
                value: "DEILEVERYMANAGER");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0488c17-668e-4e75-8c22-41c3c0781107",
                column: "NormalizedName",
                value: "GENRICUSER");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrencyName",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "Sequence",
                table: "Currencies");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "BillingMethods");

            migrationBuilder.DropColumn(
                name: "Sequence",
                table: "BillingMethods");

            migrationBuilder.RenameColumn(
                name: "DeliveryManagerId",
                table: "Project",
                newName: "ProjectHeadId");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "408f1e13-3d19-4a10-8a4c-54d7ac97fc1b",
                column: "NormalizedName",
                value: "DELIVERYMANAGER");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0488c17-668e-4e75-8c22-41c3c0781107",
                column: "NormalizedName",
                value: "GENERICUSER");
        }
    }
}
