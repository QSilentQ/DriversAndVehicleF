namespace Goods.Tools.Extensions;

public static class DateOnlyExtensions
{
    public static Int32 GetFullYearsCount(this DateOnly from, DateOnly to)
    {
        Int32 years = to.Year - from.Year;
        if (from.AddYears(years) > to) years--;
        return years;
    }
}