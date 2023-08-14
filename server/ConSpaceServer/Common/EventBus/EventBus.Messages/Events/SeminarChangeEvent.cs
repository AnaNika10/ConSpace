using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Messages.Events
{
    public class SeminarChangeEvent : IntegrationBaseEvent
    {
        public Guid SeminarId { get; set; }
        public string Name { get; set; }
        public string Hall { get; set; }
        public int[] Speakers { get; set; }

        public List<string> SpeakerNames { get; set; } = new List<string>();

        public int Exhibitors { get; set; }
        public string? Description { get; set; }
        public string[]? FilesUrls { get; set; }

        public DateTime StartDateTime { get; set; }

        public DateTime EndDateTime { get; set; }

    }
}
