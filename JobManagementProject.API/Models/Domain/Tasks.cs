using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class Tasks
    {
        [Key]
        
        public Guid TaskId { get; set; }
        [Display(Name = "Tasks Name")]
        [Required]
        public string TaskName { get; set; }

        [Display(Name = "Project")]
        public Guid ProjectId { get; set; }
        [ForeignKey(nameof(ProjectId))]
        public virtual Project? Project { get; set; }

    }
}
