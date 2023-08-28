using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.Speakers;
using Microsoft.AspNetCore.Authorization;
using Common.Security;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class SpeakerController : ControllerBase
    {
        private readonly ISpeakersRepository _repository;
        public SpeakerController(ISpeakersRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
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
            var success = await _repository.DeleteSpeaker(speakerId);
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
