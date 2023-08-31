namespace Conference.Api.Entities
{
    public class Exhibitor
    {
        public int? ExhibitorId { get; set; } 
        public string Name { get; set; }
        public int Stand { get; set; }
        public string? Description { get; set; }
    }
}
