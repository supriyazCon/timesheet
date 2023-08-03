namespace JobManagementProject.API.Models.Domain
{
    public class BillingMethod
    {
        public int BillingMethodId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Sequence { get; set; }
    }
}
