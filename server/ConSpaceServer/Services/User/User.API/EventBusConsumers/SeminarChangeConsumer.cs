using AutoMapper;
using EventBus.Messages.Events;
using MassTransit;
using User.API.DTOs;
using User.Application.Contracts.Persistence;
using User.Domain.Entities;

namespace User.API.EventBusConsumers
{
    public class SeminarChangeConsumer: IConsumer<SeminarChangeEvent>
    {
        private readonly IMapper _mapper;
        private readonly ILogger<SeminarChangeConsumer> _logger;
        private readonly IScheduleRepository _scheduleRepository;

        public SeminarChangeConsumer( IMapper mapper, ILogger<SeminarChangeConsumer> logger, IScheduleRepository scheduleRepository)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _scheduleRepository = scheduleRepository ?? throw new ArgumentNullException(nameof(scheduleRepository));

        }

        public async  Task Consume(ConsumeContext<SeminarChangeEvent> context)
        {
           var command = _mapper.Map<SeminarDto>(context.Message);

            if (command.Title != null)
            {
                _logger.LogInformation($"{typeof(SeminarChangeEvent).Name} consumed successfully. Seminar {command.Title} - {command.Id}, start : {command.StartDate} end : {command.EndDate}");
                await _scheduleRepository.update(_mapper.Map<Seminar>(command));
            }
            else
            {
                _logger.LogInformation($"{typeof(SeminarChangeEvent).Name} consumed successfully. Deleted seminar {command.Id}");
                await _scheduleRepository.delete(command.Id);
            }
            await Task.CompletedTask;

        }
    }
}
