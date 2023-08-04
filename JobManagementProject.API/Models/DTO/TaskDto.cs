﻿using System.ComponentModel.DataAnnotations;

namespace JobManagementProject.API.Models.DTO
{
    public class TaskDto
    {
        [Key]

        [Required]
        public Guid TaskId { get; set; }
        public string TaskName { get; set; }
        public Guid ProjectId { get; set; }
    }
}