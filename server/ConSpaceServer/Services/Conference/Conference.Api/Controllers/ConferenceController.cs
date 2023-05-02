﻿using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.Conference;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ConferenceController : ControllerBase
    {
        private readonly IConferenceRepository _repository;
        public ConferenceController(IConferenceRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ConferenceDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<ConferenceDTO>>> GetAllConferences()
        {
            var conferences = await _repository.GetAllConferences();
            if (conferences == null)
            {
                return NotFound();
            }
            return Ok(conferences);
        }
        [HttpGet("{ConferenceId}", Name = nameof(GetConferenceById))]
        [ProducesResponseType(typeof(ConferenceDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ConferenceDTO>> GetConferenceById(int ConferenceId)
        {
            var conference = await _repository.GetConference(ConferenceId);
            if (conference == null)
            {
                return NotFound(null);
            }
            return Ok(conference);
        }

        [HttpGet("Filter")]
        [ProducesResponseType(typeof(ConferenceDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ConferenceDTO>> GetConferencesWithFilters([FromQuery] FilterConferenceDTO Conference)
        {
            var conferences = await _repository.GetConferencesWithFilter(Conference);
            if (conferences == null)
            {
                return NotFound(null);
            }
            return Ok(conferences);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ConferenceDTO), StatusCodes.Status201Created)]
        public async Task<ActionResult<ConferenceDTO>> CreatePost([FromBody] CreateConferenceDTO request)
        {
            int Id = await _repository.CreateConference(request);
            var conference = await _repository.GetConference(Id);
            return CreatedAtRoute("GetById", new { conference.ConferenceId }, conference);

        }
        [HttpPut]
        [ProducesResponseType(typeof(ConferenceDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<ConferenceDTO>> UpdatePost([FromBody] UpdateConferenceDTO request)
        {
            await _repository.UpdateConference(request);

            var conference = await _repository.GetConference(request.ConferenceId);
            return CreatedAtRoute("GetById", new { conference.ConferenceId }, conference);
        }
        [HttpDelete("{conferenceId}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> DeletePost(int conferenceId)
        {
            var success = await _repository.DeleteConference(conferenceId);
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