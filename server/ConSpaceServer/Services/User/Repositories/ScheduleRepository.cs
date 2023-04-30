using Microsoft.EntityFrameworkCore;
using User.Data;
using User.DTO;
using User.Entities;

namespace User.Repositories;

public class ScheduleRepository : IScheduleRepository
{
    private readonly UserContext _context;
    private readonly ILogger<ScheduleRepository> _logger;

    public ScheduleRepository(UserContext context, ILogger<ScheduleRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<bool> create(Guid userId, SeminarDto seminar)
    {
        await _context.Seminars.AddAsync(new Seminar(seminar.id, userId, seminar.speakers, seminar.conferenceRoomId,
            seminar.dateTime));
        _logger.LogInformation($"Creating seminar for user with userId:{userId}");
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> delete(Guid userId, Guid seminarId)
    {
        await _context.Seminars.Where(seminar => seminar.Id == seminarId).ExecuteDeleteAsync();
        _logger.LogInformation($"Deleting seminar for user with userId:{userId}");
        return await _context.SaveChangesAsync() > 0;
    }
}