﻿namespace Conference.Api.DTOs.Seminar
{
    public class BaseSeminarDTO
    {
       
        public string Name { get; set; }
        public string Hall { get; set; }
        public int[] Speakers { get; set; }

        public List<string> SpeakerNames { get; set; } = new List<string>();

        public int Exhibitors { get; set; }
        public string? Description { get; set; }
        public string[]? FilesUrls { get; set; }

        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}
