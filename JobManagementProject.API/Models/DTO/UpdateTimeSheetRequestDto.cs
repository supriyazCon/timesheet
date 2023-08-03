namespace JobManagementProject.API.Models.DTO
{
    public class UpdateTimeSheetRequestDto
    {
        public string ProjectName { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public double TotalHours { get; set; }
       
    }
}
