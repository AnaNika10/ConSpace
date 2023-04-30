using System;

namespace User.DTO
{
    public class SeminarDto
    {
        public Guid id { get; set;}
        public List<string> speakers {get; set;}
        public Guid conferenceRoomId {get; set;}
        public DateTime dateTime {get; set;}

        public SeminarDto(
            Guid id, 
            List<string> speakers,
            Guid conferenceRoomId,
            DateTime dateTime
        ){
            this.id  = id ;
            this.speakers = speakers;
            this.conferenceRoomId = conferenceRoomId;
            this.dateTime = dateTime;
        }
    }
}