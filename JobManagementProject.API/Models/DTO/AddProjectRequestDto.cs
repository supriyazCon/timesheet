using JobManagementProject.API.Models.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace JobManagementProject.API.Models.DTO
{
    public class AddProjectRequestDto 
    {



        [Key]
        public string ProjectName { get; set; }
        public Guid ClientId { get; set; }
        
        public int ProjectCost { get; set; }
        public int DeliveryManagerId { get; set; }
        public int ProjectManagerId { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }

        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? UpdatedBy { get; set; }



    }
}
