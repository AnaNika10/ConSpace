namespace Conference.Api.Entities
{
    public class Conference
    {
            public int ConferenceId { get; set; }
            public string Name { get; set; }
            public int Floor { get; set; }
            public int[] Speakers { get; set; }
            public int Exhibitors { get; set; }
            public string? Description { get; set; }
            public string[]? FilesUrls { get; set; }
            
            public DateTime DateTime { get; set; }
        }
    }
