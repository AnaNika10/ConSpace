namespace Conference.Api.Entities
{
    public class Seminar
    {
            public Guid SeminarId { get; set; }
            public string Name { get; set; }
            public string Hall { get; set; }
            public List<Speaker> Speakers { get; set; } = new List<Speaker>();

            public int Exhibitors { get; set; }
            public string? Description { get; set; }
            public string[]? FilesUrls { get; set; }

            public DateTime StartDateTime { get; set; }
            public DateTime EndDateTime { get; set; }
    }
}
