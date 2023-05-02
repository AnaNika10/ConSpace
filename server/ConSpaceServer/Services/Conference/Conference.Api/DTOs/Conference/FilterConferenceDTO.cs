namespace Conference.Api.DTOs.Conference
{
    public class FilterConferenceDTO
    {
        public string? Name { get; set; }
        public int? Floor { get; set; }
        public int[]? Speakers { get; set; }
        public string? Description { get; set; }
        public string[]? FilesUrls { get; set; }

        public DateTime? DateTime { get; set; }
    }
}
