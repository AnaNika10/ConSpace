using Conference.Api.DTOs.FAQ;

namespace Conference.Api.Repositories
{
    public interface IFAQRepository
    {
        Task<IEnumerable<FAQDTO>> GetAllFAQs();
        Task<FAQDTO> GetFAQ(int id);

        Task<int> CreateFAQ(CreateFAQDTO request);

        Task<bool> UpdateFAQ(UpdateFAQDTO request);

        Task<bool> DeleteFAQ(int id);
    }
}
