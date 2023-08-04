using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class Tasks : CommonEntity
    {
        [Key]

        [Required]
        public Guid TaskId { get; set; }
        public string TaskName { get; set; }

        [ForeignKey("ProjectId")]
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }

    }
}
