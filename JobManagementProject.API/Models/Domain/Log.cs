using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class Log
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; }
        public Guid TaskId { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public int Hours { get; set; }
        public int Minutes { get; set; }
    }
}
