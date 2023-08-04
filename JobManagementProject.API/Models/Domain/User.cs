using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class User : CommonEntity
    {
        [Key]

        [Required]
        public Guid UserId { get; set; }
        public int UserRoleId { get; set; }

        [ForeignKey("DesignationId")]
        public Guid DesignationId { get; set; }
        public virtual Designation Designation { get; set; }
        public int EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
       
        public List<ProjectUsers> ProjectUsers { get; set; }

    }
}
