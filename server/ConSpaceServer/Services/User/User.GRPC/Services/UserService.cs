using AutoMapper;
using Grpc.Core;
using User.Common.DTOs;
using User.GRPC.Protos;
using User.Common.Repositories;

namespace User.GRPC.Services;

public class UserService : UserProtoService.UserProtoServiceBase
{
    private readonly IAttendeeRepository _attendeeRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UserService> _logger;

    public UserService(IAttendeeRepository attendeeRepository, IMapper mapper, ILogger<UserService> logger)
    {
        _attendeeRepository = attendeeRepository ?? throw new ArgumentNullException(nameof(_attendeeRepository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public override async Task<CreateUserResponse> CreateUser(CreateUserRequest request, ServerCallContext context)
    {
        string? requestType = (request.Type == "User") ? "ATTENDEE" : (request.Type == "Speaker") ? "SPEAKER" : null;

        if (Guid.TryParse(request.Id, out var id) && Enum.TryParse<AttendeeType>(requestType, out var attendeeType))
        {
            var attendee = new AttendeeDto(id, request.Name, attendeeType);

            var response = await _attendeeRepository.create(attendee);
            UserCreationDto userCreationDto = new UserCreationDto
            {
                isSuccessful = response
            };

            return _mapper.Map<CreateUserResponse>(userCreationDto);
        }
        else 
        {
            _logger.LogInformation("There is an error creating user on User Service : Id: {id}, Name : {name}, Type: {type}",
            request.Id, request.Name, request.Type);

            throw new RpcException(new Status(StatusCode.NotFound, $"User with Id = {request.Id} is not created at User Service"));
        }

    }
}
