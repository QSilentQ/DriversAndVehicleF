namespace Goods.Services.Histories.Repositories.Queries;

internal static class Sql
{
    internal static String HistorySave =>
        @"
            INSERT INTO history (
                id,
                driver_id,
                vehicle_id,
                created_datetime_utc
            )
            VALUES (
                @p_id,
                @p_driver_id,
                @p_vehicle_id,
                @p_current_datetime_utc
            )
        ";

    internal static String GetHistoryPage =>
        @"
            SELECT COUNT(*) OVER() as count, * FROM history
            ORDER BY datetime_utc DESC
			OFFSET @p_offset
			LIMIT @p_limit
        ";
}
