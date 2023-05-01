using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.Exhibitors;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ExhibitorController : ControllerBase
    {
        private readonly IExhibitorsRepository _repository;
        public ExhibitorController(IExhibitorsRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ExhibitorDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<ExhibitorDTO>>> GetAllExhibitors()
        {
            var exhibitors = await _repository.GetAllExhibitors();
            if (exhibitors == null)
            {
                return NotFound();
            }
            return Ok(exhibitors);
        }
        [HttpGet("{exhibitorId}", Name = nameof(GetExhibitorById))]
        [ProducesResponseType(typeof(ExhibitorDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ExhibitorDTO>> GetExhibitorById(int exhibitorId)
        {
            var exhibitor = await _repository.GetExhibitor(exhibitorId);
            if (exhibitor == null)
            {
                return NotFound(null);
            }
            return Ok(exhibitor);
        }


        [HttpPost]
        [ProducesResponseType(typeof(ExhibitorDTO), StatusCodes.Status201Created)]
        public async Task<ActionResult<ExhibitorDTO>> CreatePost([FromBody] CreateExhibitorDTO request)
        {
            int Id = await _repository.CreateExhibitor(request);
            var exhibitor = await _repository.GetExhibitor(Id);
            return CreatedAtRoute("GetById", new { exhibitor.ExhibitorId }, exhibitor);

        }
        [HttpPut]
        [ProducesResponseType(typeof(ExhibitorDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<ExhibitorDTO>> UpdatePost([FromBody] UpdateExhibitorDTO request)
        {
            await _repository.UpdateExhibitor(request);

            var exhibitor = await _repository.GetExhibitor(request.ExhibitorId);
            return CreatedAtRoute("GetById", new { exhibitor.ExhibitorId }, exhibitor);
        }
        [HttpDelete("{exhibitorId}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> DeletePost(int exhibitorId)
        {
            var success = await _repository.DeleteExhibitor(exhibitorId);
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
