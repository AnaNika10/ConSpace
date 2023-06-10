using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.Seminar;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SeminarController : ControllerBase
    {
        private readonly ISeminarRepository _repository;
        public SeminarController(ISeminarRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
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
        [HttpGet("{SeminarId}", Name = nameof(GetSeminarsById))]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SeminarDTO>> GetSeminarsById(int SeminarId)
        {
            var seminar = await _repository.GetSeminar(SeminarId);
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
            int Id = await _repository.CreateSeminar(request);
            var seminar = await _repository.GetSeminar(Id);
            return CreatedAtRoute("GetById", new { seminar.SeminarId }, seminar);

        }
        [HttpPut]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<SeminarDTO>> UpdateSeminar([FromBody] UpdateSeminarDTO request)
        {
            await _repository.UpdateSeminar(request);

            var seminar = await _repository.GetSeminar(request.SeminarId);
            return CreatedAtRoute("GetById", new { seminar.SeminarId }, seminar);
        }
        [HttpDelete("{seminarId}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> DeleteSeminar(int seminarId)
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
        [HttpPost]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status201Created)]
        public async Task<ActionResult<SeminarDTO>> AddSeminarSpeakers([FromBody] SeminarSpeakersDTO request)
        {
            int Id = await _repository.CreateSeminar(request);
            var seminar = await _repository.GetSeminar(Id);
            return CreatedAtRoute("GetById", new { seminar.SeminarId }, seminar);

        }
        [HttpPut]
        [ProducesResponseType(typeof(SeminarDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<SeminarDTO>> UpdateSeminarSpeakers([FromBody] UpdateSeminarDTO request)
        {
            await _repository.UpdateSeminar(request);

            var seminar = await _repository.GetSeminar(request.SeminarId);
            return CreatedAtRoute("GetById", new { seminar.SeminarId }, seminar);
        }
        [HttpDelete]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> DeleteSeminarSpeakers(int seminarId)
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
