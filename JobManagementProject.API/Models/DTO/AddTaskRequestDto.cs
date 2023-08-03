using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class AddTaskRequestDto
    {
        
        public string TaskName { get; set; }
        public Guid ProjectId { get; set; }
    }
}
