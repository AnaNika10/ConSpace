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
        public int Floor { get; set; }
        public int[] Speakers { get; set; }

        public string[] SpeakerNames { get; set; }

        public int Exhibitors { get; set; }
        public string? Description { get; set; }
        public string[]? FilesUrls { get; set; }

        public DateTime DateTime { get; set; }

    }
}
