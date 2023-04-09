using System;

namespace User.DTO
{
    public class SeminarDto
    {
        public string id { get; set;}
        public IEnumerable<string> speakers {get; set;}
        public long conferenceRoomId {get; set;}
        public DateTime dateTime {get; set;}

        public SeminarDto(
            string id, 
            IEnumerable<string> speakers,
            long conferenceRoomId,
            DateTime dateTime
        ){
            this.id  = id ;
            this.speakers = speakers;
            this.conferenceRoomId = conferenceRoomId;
            this.dateTime = dateTime;
        }
    }
}