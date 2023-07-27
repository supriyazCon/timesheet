namespace JobManagementProject.API.Models.DTO
{
    public class UpdateProjectRequestDto
    {
        public string ProjectName { get; set; }
        //public Guid ClientId { get; set; }
        public int ProjectCost { get; set; }
        public int ProjectHeadId { get; set; }
        public int ProjectManagerId { get; set; }
        //public int ProjectUserId { get; set; }
        public string Description { get; set; }
       
    }
}
