using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class AddClientRequestDto
    {
       // public Guid ClientId { get; set; }
        //[Display(Name = "Clients Name")]
        //[Required]

        public string ClientName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string EmailId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Phone { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 10)]
        public string Mobile { get; set; }
        public string Fax { get; set; }
        public string CurrencyId { get; set; }
        public string BillingMethodId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? UpdatedBy { get; set; }
    }
}
