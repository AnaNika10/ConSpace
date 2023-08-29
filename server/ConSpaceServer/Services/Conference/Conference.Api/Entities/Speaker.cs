namespace Conference.Api.Entities
{
    public class Speaker
    {
        public int SpeakerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public string Position { get; set; }
        public string Company { get; set; }
        public string BioInfo { get; set; }
    }
}
