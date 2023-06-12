namespace Conference.Api.DTOs.Seminars
{
    public class ChangeSeminarSpeakersDTO : SeminarSpeakersDTO
    {
        public  List<int> RemovedSpeakers { get; set; } = new List<int>();
    }
}
