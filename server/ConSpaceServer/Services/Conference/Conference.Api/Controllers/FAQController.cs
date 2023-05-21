using Microsoft.AspNetCore.Mvc;
using Conference.Api.Repositories;
using Conference.Api.DTOs.FAQ;

namespace Conference.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FAQController : ControllerBase
    {
        private readonly IFAQRepository _repository;
        public FAQController(IFAQRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FAQDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<FAQDTO>>> GetAllFAQ()
        {
            var seminars = await _repository.GetAllFAQs();
            if (seminars == null)
            {
                return NotFound();
            }
            return Ok(seminars);
        }
        [HttpGet("{faqId}", Name = nameof(GetFAQById))]
        [ProducesResponseType(typeof(FAQDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FAQDTO>> GetFAQById(int faqId)
        {
            var conference = await _repository.GetFAQ(faqId);
            if (conference == null)
            {
                return NotFound(null);
            }
            return Ok(conference);
        }


        [HttpPost]
        [ProducesResponseType(typeof(FAQDTO), StatusCodes.Status201Created)]
        public async Task<ActionResult<FAQDTO>> CreateFAQ([FromBody] CreateFAQDTO request)
        {
            int Id = await _repository.CreateFAQ(request);
            var question = await _repository.GetFAQ(Id);
            return CreatedAtRoute("GetById", new { question.QuestionId }, question);

        }
        [HttpPut]
        [ProducesResponseType(typeof(FAQDTO), StatusCodes.Status200OK)]
        public async Task<ActionResult<FAQDTO>> UpdateFAQ([FromBody] UpdateFAQDTO request)
        {
            await _repository.UpdateFAQ(request);

            var question = await _repository.GetFAQ(request.QuestionId);
            return CreatedAtRoute("GetById", new { question.QuestionId }, question);
        }
        [HttpDelete("{questionId}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> DeleteFAQ(int questionId)
        {
            var success = await _repository.DeleteFAQ(questionId);
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
