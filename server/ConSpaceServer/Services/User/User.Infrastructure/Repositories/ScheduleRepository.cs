#region

#endregion

using Microsoft.EntityFrameworkCore;
using User.Application.Contracts.Persistence;
using User.Domain.Entities;
using User.Infrastructure.Persistence;

namespace User.Infrastructure.Repositories;

public class ScheduleRepository : IScheduleRepository
{
    private readonly UserContext _context;
    private readonly ILogger<ScheduleRepository> _logger;

    public ScheduleRepository(UserContext context, ILogger<ScheduleRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger;
    }

    public async Task<bool> create(Guid userId, Seminar seminar)
    {
        await _context.Seminars.AddAsync(new Seminar(
            seminar.Id,
            userId,
            seminar.Speakers,
            seminar.SpeakerIds,
            seminar.Title,
            seminar.StartDate,
            seminar.EndDate,
            seminar.Location));
        _logger.LogInformation($"Creating seminar for user with userId:{userId}");
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> delete(Guid seminarId, Guid userId = default(Guid))
    {
        await _context.Seminars.Where(seminar => seminar.Id == seminarId).ExecuteDeleteAsync();
        _logger.LogInformation($"Deleting seminar for user with userId:{userId}");
        return await _context.SaveChangesAsync() < 0;
    }

    public async Task<IEnumerable<Seminar>> getSchedule(Guid userId)
    {
        //_logger.LogInformation($"Fetching user's schedule for user with id: {userId}");
        List<Seminar> result = await _context.Seminars.Where(seminar => seminar.UserId == userId).ToListAsync();
        return result;
    }

    public async Task<bool> update(Seminar seminar)
    {
        await _context.Seminars.Where(seminar => seminar.Id == seminar.Id).ExecuteUpdateAsync(setters => setters
                                                                                              .SetProperty(b => b.Location, seminar.Location)
                                                                                              .SetProperty(b => b.StartDate, seminar.StartDate)
                                                                                              .SetProperty(b => b.EndDate, seminar.EndDate)
                                                                                              .SetProperty(b => b.Speakers, seminar.Speakers)
                                                                                              .SetProperty(b => b.SpeakerIds, seminar.SpeakerIds)
                                                                                              .SetProperty(b => b.Title, seminar.Title));
        return await _context.SaveChangesAsync() > 0;
    }
}