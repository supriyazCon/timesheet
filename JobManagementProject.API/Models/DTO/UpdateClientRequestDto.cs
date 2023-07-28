using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class UpdateClientRequestDto
    {
        public string ClientName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string EmailId { get; set; }
        public int CurrencyId { get; set; }
        public int BillingMethodId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Phone { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 10)]
        public string Mobile { get; set; }
        public string Fax { get; set; }
        
    }
}
