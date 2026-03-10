using Goods.Domain.Histories;
using Goods.Domain.Services;
using Goods.Domain.Vehicles;
using Goods.Services.Histories.Repositories.Interfaces;
using Goods.Tools.Types.Results;

namespace Goods.Services.Histories;

public class HistoriesService(IHistoryRepository historyRepository) : IHistoryService
{
    public Result SaveHistory(HistoryBlank historyBlank)
    {
        historyBlank.Id ??= Guid.NewGuid();
        historyRepository.SaveHistory(historyBlank);

        return Result.Success();
    }
}
