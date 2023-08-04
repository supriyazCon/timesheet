using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class Project : CommonEntity
    {

       [Key]

        [Required]
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; }


        [ForeignKey("ClientId")]
        [Required]
        public Guid ClientId { get; set; }
        public virtual Client Client { get; set; }
        public int ProjectCost { get; set; }
        public int DeliveryManagerId { get; set; }
        public int ProjectManagerId { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }

        //public int ProjectUserId { get; set; }
        // public List<ProjectUsers> ProjectUsers { get; set; }
        //public Users Users { get; set; }
        //public Client Client { get; set; }

    }
}
