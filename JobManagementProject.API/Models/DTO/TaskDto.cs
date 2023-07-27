using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class TaskDto
    {
        public Guid TaskId { get; set; }
        [Display(Name = "Tasks Name")]
        [Required]
        public string TaskName { get; set; }
        public Guid ProjectId { get; set; }
    }
}
