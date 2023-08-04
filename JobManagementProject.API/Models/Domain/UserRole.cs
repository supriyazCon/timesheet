using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class UserRole : CommonEntity
    {
       [Key]

        [Required]
        public Guid UserRoleId { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
       
    }
}
