namespace JobManagementProject.API.Models.DTO
{
    public class LoginResponseDto
    {
        public string JwtToken { get; set; }
        // public string[]  Roles { get; set; }
        public List<string> Roles { get; set; }
    }
}
