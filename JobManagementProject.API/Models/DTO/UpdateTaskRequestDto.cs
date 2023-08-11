using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class UpdateTaskRequestDto
    {
        [Key]
        public string TaskName { get; set; }
        public Guid ProjectId { get; set; }
       
    }
}
