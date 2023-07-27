using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class ProjectUsers : CommonEntity
    {
        [Key]
        
        public Guid ProjectUserId { get; set; }

        [Display(Name = "Project")]
        public Guid ProjectId { get; set; }
        [ForeignKey(nameof(ProjectId))]
        public virtual Project? Project { get; set; }

       
        [Display(Name = "Users")]
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual Users? Users { get; set; }
       
        
    }
}
