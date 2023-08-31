using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.Speakers;
using Microsoft.AspNetCore.Authorization;
using Common.Security;
using Conference.Api.DTOs.Seminars;
using Conference.Api.DTOs.Seminar;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class SpeakerController : ControllerBase
    {
        private readonly ISpeakersRepository _repository;
        private readonly ISeminarRepository _SeminarRepository;
        public SpeakerController(ISpeakersRepository repository, ISeminarRepository SeminarRepository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _SeminarRepository = SeminarRepository ?? throw new ArgumentNullException(nameof(SeminarRepository));
        }
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SpeakerDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<SpeakerDTO>>> GetAllSpeakers()
        {
            var speakers = await _repository.GetAllSpeakers();
            if (speakers == null)
            {
                return NotFound();
            }
            return Ok(speakers);
        }
        [HttpGet("{speakerId}", Name = nameof(GetSpeakerById))]
        [ProducesResponseType(typeof(SpeakerDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]

        public async Task<ActionResult<SpeakerDTO>> GetSpeakerById(int speakerId)
        {
            var speaker = await _repository.GetSpeaker(speakerId);
            if (speaker == null)
            {
                return NotFound(null);
            }
            return Ok(speaker);
        }

        [HttpPost]
        [ProducesResponseType(typeof(SpeakerDTO), StatusCodes.Status201Created)]
        [Authorize(Policy = RolePolicy.ADMINISTRATOR)]

        public async Task<ActionResult<SpeakerDTO>> CreateSpeaker([FromBody] CreateSpeakerDTO request)
        {
            int Id = await _repository.CreateSpeaker(request);
            var speaker = await _repository.GetSpeaker(Id);
            return CreatedAtRoute("GetSpeakerById", new { speaker.SpeakerId }, speaker);

        }
        [HttpPut]
        [ProducesResponseType(typeof(SpeakerDTO), StatusCodes.Status200OK)]
        [Authorize(Policy = RolePolicy.ADMINISTRATOR)]

        public async Task<ActionResult<SpeakerDTO>> UpdateSpeaker([FromBody] UpdateSpeakerDTO request)
        {
            await _repository.UpdateSpeaker(request);

            var speaker = await _repository.GetSpeaker(request.SpeakerId);
            return CreatedAtRoute("GetSpeakerById", new { speaker.SpeakerId }, speaker);
        }
        [HttpDelete("{speakerId}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [Authorize(Policy = RolePolicy.ADMINISTRATOR)]

        public async Task<ActionResult<bool>> DeleteSpeaker(int speakerId)
        {
            int[] array = new int[1] { speakerId };
            var toBeDeleted = new FilterSeminarDTO { Speakers = array };
            var seminars = await _SeminarRepository.GetSeminarsWithFilter(toBeDeleted);
            var success = await _repository.DeleteSpeaker(speakerId);

            if (success)
            {
                foreach (var seminar in seminars)
                {
                    var speakers = await _SeminarRepository.GetSeminarSpeakers(seminar.SeminarId);

                    if (speakers.Count == 0)
                    {
                        await _SeminarRepository.DeleteSeminar(seminar.SeminarId);
                    }
                }

                return Ok();
            }
            else
            {
                return NotFound();
            }

        }
    }
}
