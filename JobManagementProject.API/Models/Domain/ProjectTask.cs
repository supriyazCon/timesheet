using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobManagementProject.API.Models.Domain
{
    public class ProjectTask
    {
        

        public string JobName { get; set; }

       
        public string Project { get; set; }
    }
}

