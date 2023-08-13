using AutoMapper;
using EventBus.Messages.Events;
using MassTransit;
using MediatR;
using User.API.Commands;
using User.Common.DTOs;
using User.Common.Repositories;

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

        public  Task Consume(ConsumeContext<SeminarChangeEvent> context)
        {
           var command = _mapper.Map<SeminarDto>(context.Message);

           _logger.LogInformation($"{typeof(SeminarChangeEvent).Name} consumed successfully. Created order id: {command.dateTime}");
            _scheduleRepository.update(command);



            return Task.CompletedTask;

        }
    }
}
