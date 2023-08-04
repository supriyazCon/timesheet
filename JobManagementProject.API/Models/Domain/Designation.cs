using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class Designation : CommonEntity
    {
       [Key]

        [Required]
        public Guid DesignationId { get; set; }
        public string DesignationName { get; set; }
        

    }
}