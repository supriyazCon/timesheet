namespace JobManagementProject.API.Models.Domain
{
    public class WeeklyLog : Log
    {
        
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
