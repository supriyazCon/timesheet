using JobManagementProject.API.Models.Domain;
using System.ComponentModel.DataAnnotations;


namespace JobManagementProject.API.Models.DTO
{
    public class AddUsersRequestDto
    {

        public string EmpId { get; set; }
        public Guid UserRoleId { get; set; }
        public Guid DesignationId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreateDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime UpdateDate { get; set; }
        public int? UpdatedBy { get; set; }
       
    }
}
