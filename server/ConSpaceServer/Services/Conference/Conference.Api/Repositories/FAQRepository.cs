using AutoMapper;
using Conference.Api.DTOs.FAQ;
using Dapper;

namespace Conference.Api.Repositories
{
    public class FAQRepository : IFAQRepository
    {
        private readonly IConferenceContext _context;
        private readonly IMapper _mapper;

        public FAQRepository(IConferenceContext context, IMapper mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<FAQDTO>> GetAllFAQs()
        {
            using var connection = _context.GetConnection();

            var faqs = await connection.QueryAsync<Entities.FAQ>(
              "SELECT * FROM \"FAQ\""

              );
            return _mapper.Map<IEnumerable<FAQDTO>>(faqs);
        }
        public async Task<FAQDTO> GetFAQ(int id)
        {
            using var connection = _context.GetConnection();

            var post = await connection.QueryFirstOrDefaultAsync<Entities.FAQ>(
                "SELECT * FROM \"FAQ\" WHERE \"QuestionId\" = @Id", new { Id = id });

            return _mapper.Map<FAQDTO>(post);
        }

        public async Task<int> CreateFAQ(CreateFAQDTO faq)
        {
            using var connection = _context.GetConnection();

            int id = await connection.QueryFirstAsync<int>(
                  "insert into \"FAQ\" (\"Question\",\"Answer\")" +
                  " values (@Question, @Answer) RETURNING \"QuestionId\"",
                  new
                  {
                      Question = faq.Question,
                      Answer = faq.Answer

                  });

            return id;
        }
        public async Task<bool> UpdateFAQ(UpdateFAQDTO faq)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "UPDATE \"FAQ\" SET \"Question\"=@Question, \"Answer\" = @Answer" +
                " WHERE \"QuestionId\" = @QuestionId",
               new
               {
                   SpeakerId = faq.QuestionId,
                   Question = faq.Question,
                   Answer = faq.Answer
               });

            if (affected == 0)
                return false;

            return true;
        }
        public async Task<bool> DeleteFAQ(int faqId)
        {
            using var connection = _context.GetConnection();

            var affected = await connection.ExecuteAsync(
                "DELETE FROM \"FAQ\" WHERE \"QuestionId\" = @faqId",
                new { faqId });

            if (affected == 0)
                return false;

            return true;
        }
    }
}
