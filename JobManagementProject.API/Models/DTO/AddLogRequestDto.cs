﻿namespace JobManagementProject.API.Models.DTO
{
    public class AddDailyLogRequestDto
    {
        public string ProjectName { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public int Hours { get; set; }
    }
}
