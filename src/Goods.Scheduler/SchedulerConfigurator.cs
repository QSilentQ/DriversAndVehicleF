using Goods.Scheduler.Jobs;
using Microsoft.Extensions.DependencyInjection;
using Quartz;

namespace Goods.Scheduler
{
    public static class SchedulerConfigurator
    {
        public static IServiceCollection AddQuartzTasks(this IServiceCollection services)
        {
            services.AddQuartz(q =>
            {
                var jobKey = new JobKey(nameof(ReassignDrivers));
                q.AddJob<ReassignDrivers>(opts => opts.WithIdentity(jobKey));

                q.AddTrigger(opts => opts
                    .ForJob(jobKey)
                    .WithIdentity("reassingDrivers-trigger")
                    .WithCronSchedule("0 0 3 * * ?")
                );
            });

            services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

            return services;
        }
    }
}
