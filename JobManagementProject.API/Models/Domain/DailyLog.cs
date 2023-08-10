using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.Domain
{
    public class DailyLog : Log
    {
       

        public int WorkDate { get; set; }
        public int TotalMinutes => (Hours * 60) + Minutes; // Calculated property
    }
}
