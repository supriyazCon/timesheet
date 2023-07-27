using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class Project : CommonEntity
    {

        [Key]
        public Guid ProjectId { get; set; }
        [Display(Name ="Project Name")]
        [Required]
        public string ProjectName { get; set; }


        /*[Display(Name = "Clients")]
        public Guid ClientId { get; set; }
        [ForeignKey(nameof(ClientId))]*/
        public virtual Clients? Clients { get; set; }
        public int ProjectCost { get; set; }
        public int ProjectHeadId { get; set; }
        public int ProjectManagerId { get; set; }
        //public int ProjectUserId { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }
        

        // public List<ProjectUsers> ProjectUsers { get; set; }
        //public Users Users { get; set; }
        //public Client Client { get; set; }

    }
}
