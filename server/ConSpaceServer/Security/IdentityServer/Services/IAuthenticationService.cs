using IdentityServer.DTOs;
using IdentityServer.Entities;
using System.Threading.Tasks;

namespace IdentityServer.Services;

public interface IAuthenticationService
{
    Task<UserEntity> ValidateUser(UserCredentialsDto userCredentials);
    Task<AuthenticationModel> CreateAuthenticationModel(UserEntity user);
    Task RemoveRefreshToken(UserEntity user, string refreshToken);
    Task RevokeAllRefreshTokens();
}