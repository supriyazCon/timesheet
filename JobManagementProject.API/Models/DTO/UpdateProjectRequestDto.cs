using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class UpdateProjectRequestDto
    {
        [Key]
        public string ProjectName { get; set; }
        public Guid ClientId { get; set; }
        public int ProjectCost { get; set; }
        public int DeliveryManagerId { get; set; }
        public int ProjectManagerId { get; set; }
        //public int ProjectUserId { get; set; }
        public string Description { get; set; }
       
    }
}
