
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace User.API.Commands
{ //TODO Ana Obrisati
    public class ChangeSeminarCommand 
    {
        public Guid id { get; set; }
        public List<string> speakers { get; set; } = new List<string>();
        public DateTime dateTime { get; set; }
    }
}
