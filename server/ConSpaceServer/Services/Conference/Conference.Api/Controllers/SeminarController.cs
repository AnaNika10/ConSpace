using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.Seminar;
using Conference.Api.DTOs.Seminars;
using MassTransit;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using EventBus.Messages.Events;
using Common.Security;
using System.Collections;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status400BadRequest)]
        [Authorize(Policy = RolePolicy.ADMINISTRATOR)]
        public async Task<ActionResult<SeminarDTO>> CreateSeminar([FromBody] CreateSeminarDTO request)
        {
            if(request.StartDateTime > request.EndDateTime)
            {
                return BadRequest();
            }
            var allSeminars = await _repository.GetAllSeminars();

            var sameHallIntersection = allSeminars.Where(x => x.Hall == request.Hall &&
                                                              x.StartDateTime <= request.StartDateTime && x.EndDateTime >= request.StartDateTime).FirstOrDefault();

            var sameHallUnion = allSeminars.Where(x => x.Hall == request.Hall && 
                                                       x.StartDateTime >= request.StartDateTime && x.EndDateTime <= request.EndDateTime).FirstOrDefault();

            var sameSpeakersIntersection = allSeminars.Where(x => StructuralComparisons.StructuralEqualityComparer.Equals(request.Speakers, x.Speakers) &&
                                                                  x.StartDateTime <= request.StartDateTime && x.EndDateTime >= request.StartDateTime).FirstOrDefault();

            var sameSpeakersUnion = allSeminars.Where(x => StructuralComparisons.StructuralEqualityComparer.Equals(request.Speakers, x.Speakers) &&
                                                           x.StartDateTime >= request.StartDateTime && x.EndDateTime <= request.EndDateTime).FirstOrDefault();

            if (sameHallIntersection is null && sameHallUnion is null && sameSpeakersIntersection is null && sameSpeakersUnion is null)
            {
                var Id = await _repository.CreateSeminar(request);


                var seminar = await _repository.GetSeminar(Id);

                var changeSpeakersRequest = new ChangeSeminarSpeakersDTO { SeminarId = seminar.SeminarId, Speakers = request.Speakers };
                await _repository.ChangeSeminarSpeakers(changeSpeakersRequest);
                return CreatedAtRoute("GetSeminarsById", new { seminar.SeminarId }, seminar);
            }
            else
            {
                return BadRequest();
            }

        }
        [HttpPut]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status200OK)]
        [Authorize(Policy = RolePolicy.ADMINISTRATOR)]
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
        [Authorize(Policy = RolePolicy.ADMINISTRATOR)]
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
