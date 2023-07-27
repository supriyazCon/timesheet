namespace JobManagementProject.API.Models.DTO
{
    public class UpdateTaskRequestDto
    {
        public string TaskName { get; set; }
        public Guid ProjectId { get; set; }
    }
}
