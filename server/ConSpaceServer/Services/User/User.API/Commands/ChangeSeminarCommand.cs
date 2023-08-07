using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace User.API.Commands
{
    public class ChangeSeminarCommand : IRequest<int>
    {
        public Guid id { get; set; }
        public List<string> speakers { get; set; } = new List<string>();
        public Guid conferenceRoomId { get; set; }
        public DateTime dateTime { get; set; }
    }
}
