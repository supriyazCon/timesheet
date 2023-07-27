using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class Designations : CommonEntity
    {
        [Key]
        public Guid DesignationId { get; set; }
        [Display(Name = "Designations")]
        [Required]
        public string DesignationName { get; set; }
        

    }
}