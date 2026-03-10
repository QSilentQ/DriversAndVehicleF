using Goods.Domain.Histories;
using Goods.Services.Histories.Repositories.Models;
using Npgsql;

namespace Goods.Services.Histories.Repositories.Converters;

internal static class HistoriesConverter
{
    internal static History[] ToHsitories(this HistoryDb[] historyDbs) => [.. historyDbs.Select(ToHistory)];

    internal static History ToHistory(this HistoryDb historyDb)
    {
        return new History(
            historyDb.Id,
            historyDb.DriverId,
            historyDb.VehicleId
        );
    }

    internal static HistoryDb ToHistoryDb(this NpgsqlDataReader reader)
    {
        return new HistoryDb(
            reader.GetGuid(reader.GetOrdinal("id")),
            reader.GetGuid(reader.GetOrdinal("driver_id")),
            reader.GetGuid(reader.GetOrdinal("vehicle_id")),
            reader.GetDateTime(reader.GetOrdinal("created_datetime_utc"))
        );
    }
}
