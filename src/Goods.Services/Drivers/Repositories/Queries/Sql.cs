namespace Goods.Services.Drivers.Repositories.Queries;

internal static class Sql
{
    internal static String DriverSave =>
        @"
            INSERT INTO drivers (
                id,
                first_name,
                second_name,
                last_name,
                gender,
                driver_license_category,
                birthday,
                experience,
                pay_per_hour,
                created_datetime_utc,
                is_removed
            )
            VALUES (
                @p_id,
                @p_first_name,
                @p_second_name,
                @p_last_name,
                @p_gender,
                @p_driver_license_category,
                @p_birthday,
                @p_experience,
                @p_pay_per_hour,
                @p_current_datetime_utc,
                FALSE
            )
	        ON CONFLICT (id) DO UPDATE SET
	        	first_name = @p_first_name,
	        	second_name = @p_second_name,
	        	last_name = @p_last_name,
                gender = @p_gender,
                driver_license_category = @p_driver_license_category,
                birthday = @p_birthday,
                experience = @p_experience,
                pay_per_hour = @p_pay_per_hour,
                modified_datetime_utc = @p_current_datetime_utc
        ";

    internal static String GetDriversPage =>
        @"
			SELECT COUNT(*) OVER() as count, * FROM drivers
			WHERE NOT is_removed
            ORDER BY created_datetime_utc DESC 
			OFFSET @p_offset
			LIMIT @p_limit
		";

    internal static String GetDriverById => "SELECT * FROM drivers WHERE id = @p_driver_id AND NOT is_removed";

    internal static String MarkDriverAsRemoved =>
        @"
			UPDATE drivers
			SET is_removed = TRUE,
                modified_datetime_utc = @p_current_datetime_utc
			WHERE id = @p_driver_id
		";
}

