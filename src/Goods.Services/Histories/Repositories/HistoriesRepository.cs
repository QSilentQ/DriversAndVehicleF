using Goods.Domain.Histories;
using Goods.Services.Histories.Repositories.Interfaces;
using Goods.Services.Histories.Repositories.Queries;
using static Goods.Tools.Utils.NumberUtils;
using Goods.Tools.Utils;
using Goods.Services.Histories.Repositories.Converters;

namespace Goods.Services.Histories.Repositories;

internal class HistoriesRepository : IHistoryRepository
{
    public void SaveHistory(HistoryBlank historyBlank)
    {
        DatabaseUtils.Execute(
            Sql.HistorySave,
            (parametres) =>
            {
                parametres.AddWithValue("p_id", Guid.NewGuid());
                parametres.AddWithValue("p_driver_id", historyBlank.DriverId);
                parametres.AddWithValue("p_vehicle_id", historyBlank.VehicleId);
                parametres.AddWithValue("p_current_datetime_utc", DateTime.UtcNow);
            }
        );
    }

    public static Page<History> GetHistoriesPage(Int32 page, Int32 countInPage)
    {
        (Int32 offset, Int32 limit) = NormalizeRange(page, countInPage);

        return DatabaseUtils
            .GetPage(
                Sql.GetHistoryPage,
                (parametres) =>
                {
                    parametres.AddWithValue("@p_offset", offset);
                    parametres.AddWithValue("@p_limit", limit);
                },
                reader => reader.ToHistoryDb()
            ).Convert(historyDb => historyDb.ToHistory());
    }
}
