using Goods.Domain.Histories;
using Goods.Tools.Types.Results;

namespace Goods.Domain.Services;

public interface IHistoryService
{
    Result SaveHistory(HistoryBlank historyBlank);
}
