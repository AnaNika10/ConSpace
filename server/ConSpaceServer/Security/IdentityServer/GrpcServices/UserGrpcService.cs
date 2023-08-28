using System;
using System.Threading.Tasks;
using User.GRPC.Protos;

namespace IdentityServer.GrpcServices;

public class UserGrpcService
{
    private readonly UserProtoService.UserProtoServiceClient _userProtoServiceClient;

    public UserGrpcService(UserProtoService.UserProtoServiceClient userProtoServiceClient)
    {
        _userProtoServiceClient = userProtoServiceClient ?? throw new ArgumentNullException(nameof(userProtoServiceClient));
    }

    public async Task<CreateUserResponse> CreateUser(string id, string name, string type, string email)
    {
        var createUserRequest = new CreateUserRequest();
        createUserRequest.Id = id;
        createUserRequest.Name = name;
        createUserRequest.Type = type;
        createUserRequest.Email = email;
        
        return await _userProtoServiceClient.CreateUserAsync(createUserRequest);
    }
}
