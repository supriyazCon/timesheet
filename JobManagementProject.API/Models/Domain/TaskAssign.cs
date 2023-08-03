using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class TaskAssign
    {
        [Key]
        

        [Display(Name = "Tasks")]        public Guid TaskId { get; set; }        [ForeignKey(nameof(TaskId))]        public virtual Tasks? Tasks { get; set; }


        [Display(Name = "Users")]        public Guid UserId { get; set; }        [ForeignKey(nameof(UserId))]        public virtual Users? Users { get; set; }


    }
}