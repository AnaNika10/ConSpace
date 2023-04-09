using System;

namespace User.DTO
{
    public class ReminderDto
    {
        public string id { get; set;}
        public ReminderType type;
        public DateTime timestamp {get; set;}
        public string content {get; set;}

        public ReminderDto(
            string id,
            ReminderType type,
            DateTime timestamp,
            string content
        ){
            this.id  = id ;
            this.type = type;
            this.timestamp = timestamp;
            this.content = content;
        }
    }

    public enum ReminderType
    {
        SEMINAR,
        MEET_UP       
    }
}