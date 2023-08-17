using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.Seminar;
using Conference.Api.DTOs.Seminars;
using MassTransit;
using AutoMapper;
using EventBus.Messages.Events;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SeminarController : ControllerBase
    {
        private readonly ISeminarRepository _repository;
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly IMapper _mapper;
        public SeminarController(ISeminarRepository repository, IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SeminarDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<SeminarDTO>>> GetAllSeminars()
        {
            var seminars = await _repository.GetAllSeminars();
            if (seminars == null)
            {
                return NotFound();
            }
            return Ok(seminars);
        }
        [HttpGet("{seminarId}", Name = nameof(GetSeminarsById))]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SeminarDTO>> GetSeminarsById(Guid seminarId)
        {
            var seminar = await _repository.GetSeminar(seminarId);
            if (seminar == null)
            {
                return NotFound(null);
            }
            return Ok(seminar);
        }

        [HttpGet("Filter")]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SeminarDTO>> GetSeminarsWithFilters([FromQuery] FilterSeminarDTO seminar)
        {
            var seminars = await _repository.GetSeminarsWithFilter(seminar);
            if (seminars == null)
            {
                return NotFound(null);
            }
            return Ok(seminars);
        }

        [HttpPost]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status201Created)]
        public async Task<ActionResult<SeminarDTO>> CreateSeminar([FromBody] CreateSeminarDTO request)
        {
            var Id = await _repository.CreateSeminar(request);
            var seminar = await _repository.GetSeminar(Id);

            var changeSpeakersRequest = new ChangeSeminarSpeakersDTO { SeminarId = seminar.SeminarId, Speakers = seminar.Speakers};
            await _repository.ChangeSeminarSpeakers(changeSpeakersRequest);
            return CreatedAtRoute("GetSeminarsById", new { seminar.SeminarId }, seminar);

        }
        [HttpPut]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<SeminarDTO>> UpdateSeminar([FromBody] UpdateSeminarDTO request)
        {            

            var speakers = await _repository.GetSeminarSpeakers(request.SeminarId);
            var toBeInserted = request.Speakers.ExceptBy(speakers, x => x).ToList();
            var toBeDeleted = speakers.ExceptBy(request.Speakers, x => x).ToList();
            if (toBeInserted.Any() || toBeDeleted.Any())
            {
                var changeSpeakersRequest = new ChangeSeminarSpeakersDTO { SeminarId = request.SeminarId, Speakers = toBeInserted, RemovedSpeakers = toBeDeleted };
                await _repository.ChangeSeminarSpeakers(changeSpeakersRequest);
            }
            
            await _repository.UpdateSeminar(request);
            var seminar = await _repository.GetSeminar(request.SeminarId);

            
            if (seminar == null)
            {
                return BadRequest();
            }
            var eventMessage = _mapper.Map<SeminarChangeEvent>(seminar);
            await _publishEndpoint.Publish(eventMessage);

            return Ok(seminar);
        }
        [HttpDelete("{seminarId}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> DeleteSeminar(Guid seminarId)
        {
            var success = await _repository.DeleteSeminar(seminarId);
            if (success)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }
    }
}
