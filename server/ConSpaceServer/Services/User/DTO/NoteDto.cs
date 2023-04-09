using System;

namespace User.DTO
{
    public class NoteDto
    {
        public string id { get; set;}
        public string title { get; set;}
        public string content {get; set;}
        public NoteDto(
            string id, 
            string title,
            string content
        ){
            this.id  = id;
            this.title = title;
            this.content = content;
        }
    }
}