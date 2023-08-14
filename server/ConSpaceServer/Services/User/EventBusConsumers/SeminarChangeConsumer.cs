using AutoMapper;
using EventBus.Messages.Events;
using MassTransit;
using MediatR;
using User.DTO;

namespace User.API.EventBusConsumers
{
    public class SeminarChangeConsumer: IConsumer<SeminarChangeEvent>
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        private readonly ILogger<SeminarChangeConsumer> _logger;

        public SeminarChangeConsumer(IMediator mediator, IMapper mapper, ILogger<SeminarChangeConsumer> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Consume(ConsumeContext<SeminarChangeEvent> context)
        {
           var command = _mapper.Map<SeminarDto>(context.Message);
           var id = await _mediator.Send(command);


        }
    }
}
