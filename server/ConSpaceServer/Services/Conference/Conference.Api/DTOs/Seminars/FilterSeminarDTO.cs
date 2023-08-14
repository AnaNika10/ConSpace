namespace Conference.Api.DTOs.Seminar
{
    public class FilterSeminarDTO
    {
        public string? Name { get; set; }
        public string? Hall { get; set; }
        public int[]? Speakers { get; set; }
        public string? Description { get; set; }
        public string[]? FilesUrls { get; set; }

        public DateTime? StartDateTime { get; set; }

        public DateTime? EndDateTime { get; set; }

        public int? Exhibitors { get; set; }
    }
}
