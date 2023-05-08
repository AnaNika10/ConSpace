using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Security;

public class RolePolicy
{
    public const string ADMINISTRATOR = "RequireAdministratorRole";
    public const string USER = "RequireUserRole";
    public const string SPEAKER = "RequireSpeakerRole";
}
