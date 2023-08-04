using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class TimeSheet : CommonEntity
    {
        [Key]
        public Guid  Id { get; set; }
        public string ProjectName { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public double TotalHours { get; set; }
       


    }
}
