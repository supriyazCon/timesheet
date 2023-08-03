using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class Users : CommonEntity
    {
        [Key]

        public Guid UserId { get; set; }
        [Display(Name = "Users Name")]
        [Required]
        public int UserRoleId { get; set; }

        [Display(Name = "Designations")]
        public Guid DesignationId { get; set; }
        [ForeignKey(nameof(DesignationId))]
        public virtual Designations? Designations { get; set; }
        public int EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
       
        public List<ProjectUsers> ProjectUsers { get; set; }

    }
}
