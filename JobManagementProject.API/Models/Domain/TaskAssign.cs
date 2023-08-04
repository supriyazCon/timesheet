using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class TaskAssign
    {
        [Key]
        

              public Guid TaskId { get; set; }        [ForeignKey("TaskId")]        public virtual Tasks Task { get; set; }        public Guid UserId { get; set; }        [ForeignKey("UserId")]        public virtual User User { get; set; }


    }
}