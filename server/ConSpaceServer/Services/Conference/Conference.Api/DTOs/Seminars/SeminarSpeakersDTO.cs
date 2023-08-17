namespace Conference.Api.DTOs.Seminars
{
    public class SeminarSpeakersDTO 
    {
        public Guid SeminarId { get; set; }

        public List<int> Speakers { get; set; }  = new List<int>();
    }
}
