#region

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using User.Common.Data;
using User.Common.DTOs;
using User.Common.Entities;

#endregion

namespace User.Common.Repositories;

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
        await _context.Seminars.AddAsync(new Seminar(seminar.id, userId, seminar.speakers, seminar.hall,
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

    public async Task<bool> update(SeminarDto seminar)
    {
        await _context.Seminars.Where(seminar => seminar.Id == seminar.Id).ExecuteUpdateAsync(setters => setters
                                                                                              .SetProperty(b=> b.Hall, seminar.hall)
                                                                                              .SetProperty(b=>b.DateTimeOfSeminar,seminar.dateTime));
        return await _context.SaveChangesAsync() > 0;
    }
}