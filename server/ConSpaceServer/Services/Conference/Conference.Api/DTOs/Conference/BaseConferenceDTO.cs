namespace Conference.Api.DTOs.Conference
{
    public class BaseConferenceDTO
    {
       
        public string Name { get; set; }
        public int Floor { get; set; }
        public int[] Speakers { get; set; }

        public int Exhibitors { get; set; }
        public string? Description { get; set; }
        public string[]? FilesUrls { get; set; }

        public DateTime DateTime { get; set; }
    }
}
