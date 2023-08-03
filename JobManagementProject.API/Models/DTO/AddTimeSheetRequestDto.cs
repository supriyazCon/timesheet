namespace JobManagementProject.API.Models.DTO
{
    public class AddTimeSheetRequestDto
    {

        public string ProjectName { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public double TotalHours { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? UpdatedBy { get; set; }

    }
}
