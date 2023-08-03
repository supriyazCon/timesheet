using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class Clients : CommonEntity
    {
        [Key]
        public Guid ClientId { get; set; }
        [Display(Name = "Clients Name")]
        [Required]
        public string ClientName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Fax { get; set; }
        public int CurrencyId { get; set; }
        public int BillingMethodId { get; set; }
       
    }

}
