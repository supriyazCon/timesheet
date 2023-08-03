using JobManagementProject.API.Models.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace JobManagementProject.API.Models.DTO
{
    public class AddProjectRequestDto : CommonEntity
    {



        [Key]
        public string ProjectName { get; set; }


        [Display(Name = "Clients")]
        public Guid ClientId { get; set; }
        [ForeignKey(nameof(ClientId))]
        public virtual Clients? Clients { get; set; }
        public int ProjectCost { get; set; }
        public int DeliveryManagerId { get; set; }
        public int ProjectManagerId { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }

    }
}
