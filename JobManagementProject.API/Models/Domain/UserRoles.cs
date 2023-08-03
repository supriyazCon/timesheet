using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class UserRoles : CommonEntity
    {
       [Key]
        public Guid UserRoleId { get; set; }
        [Display(Name = "UserRoles Name")]
        [Required]
        public string RoleName { get; set; }
        public string Description { get; set; }
       
    }
}
