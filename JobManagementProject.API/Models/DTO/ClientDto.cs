﻿using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class ClientDto
    {
        [Key]

        [Required]
        public Guid ClientId { get; set; }
  
        public string ClientName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Fax { get; set; }
        public int CurrencyId { get; set; }
        public int BillingMethodId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? UpdatedBy { get; set; }
    }
}