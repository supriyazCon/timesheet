using JobManagementProject.API.Models.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace JobManagementProject.API.Models.DTO
{
    public class ProjectDto : CommonEntity
    {

        [Key]

        [Required]
        public Guid ProjectId { get; set; }

        public string ProjectName { get; set; }
        public Guid ClientId { get; set; }
        [ForeignKey("ClientId")]
        public virtual Client Client { get; set; }
        public int ProjectCost { get; set; }
        public int ProjectHeadId { get; set; }
        public int ProjectManagerId { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }
    }
}
