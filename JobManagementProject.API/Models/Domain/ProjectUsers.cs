using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class ProjectUsers : CommonEntity
    {

        [Key]
        public Guid ProjectUserId { get; set; }

        [ForeignKey("ProjectId")]
        public Guid ProjectId { get; set; }
        
       public virtual Project Project { get; set; }

        [ForeignKey("UserId")]
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
       
        
    }
}
