using Microsoft.AspNetCore.Identity;

namespace JobManagementProject.API.Repositories
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user, List<string> roles);
       
    }
}
