using Goods.Domain.Histories;

namespace Goods.Services.Histories.Repositories.Interfaces;

public interface IHistoryRepository
{
    void SaveHistory(HistoryBlank historyBlank);
}
