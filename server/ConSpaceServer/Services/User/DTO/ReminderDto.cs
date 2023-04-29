using System;

namespace User.DTO
{
    public class ReminderDto
    {
        public Guid id { get; set;}
        public ReminderType type;
        public DateTimeOffset timestamp {get; set;}
        public string content {get; set;}

        public Guid eventId { get; set; }

        public ReminderDto(
            Guid id,
            ReminderType type,
            DateTimeOffset timestamp,
            string content,
            Guid eventId
        ){
            this.id  = id ;
            this.type = type;
            this.timestamp = timestamp;
            this.content = content;
            this.eventId = eventId;
        }
    }

    public enum ReminderType
    {
        SEMINAR,
        MEET_UP       
    }
}