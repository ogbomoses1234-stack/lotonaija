import { memo } from 'react';
import { cn } from '@/utils/cn';
import { formatNGN } from '@/utils/formatters';
import { ProgressBar } from '@/components/ui/ProgressBar';

type StatCard = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  color: 'primary' | 'success' | 'accent' | 'transfer';
};

export const ResultsStats = memo(() => {
  const stats: StatCard[] = [
    {
      title: 'Total Played',
      value: '47',
      subtitle: 'Tickets this month',
      icon: '🎫',
      trend: 'up',
      color: 'primary',
    },
    {
      title: 'Total Won',
      value: formatNGN(15500, { showDecimals: false }),
      subtitle: 'Lifetime earnings',
      icon: '🏆',
      trend: 'up',
      color: 'success',
    },
    {
      title: 'Win Rate',
      value: '23.4%',
      subtitle: 'Above average!',
      icon: '📈',
      trend: 'neutral',
      color: 'accent',
    },
    {
      title: 'Referral Bonus',
      value: formatNGN(2500, { showDecimals: false }),
      subtitle: 'Pending payout',
      icon: '👥',
      trend: 'up',
      color: 'transfer',
    },
  ];

  const getColorClass = (color: StatCard['color']) => {
    const classes = {
      primary: 'text-brand-primary',
      success: 'text-brand-success',
      accent: 'text-brand-primary',
      transfer: 'text-amber-600',
    };
    return classes[color];
  };

  const recentDraws = [
    {
      id: 'DRW-2024-188',
      date: '24 May 2024',
      numbers: [7, 14, 23, 31, 42, 49],
      jackpot: 50000000,
      yourTicket: true,
    },
    {
      id: 'DRW-2024-187',
      date: '23 May 2024',
      numbers: [3, 11, 19, 28, 35, 44],
      jackpot: 48000000,
      yourTicket: false,
    },
    {
      id: 'DRW-2024-186',
      date: '22 May 2024',
      numbers: [5, 12, 21, 33, 41, 50],
      jackpot: 45000000,
      yourTicket: true,
    },
  ];

  return (
    <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
        <h1 className="text-2xl font-black font-mono uppercase tracking-wider text-gray-900">
          Results & Stats
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xl">{stat.icon}</span>
              {stat.trend && (
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider',
                    stat.trend === 'up'
                      ? 'text-brand-success'
                      : stat.trend === 'down'
                      ? 'text-red-500'
                      : 'text-gray-400'
                  )}
                >
                  {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono mb-1">
              {stat.title}
            </p>
            <p className={cn('text-lg font-black', getColorClass(stat.color))}>
              {stat.value}
            </p>
            {stat.subtitle && (
              <p className="text-[10px] text-gray-500 mt-1">{stat.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Draws */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider font-mono">
            Recent Draws
          </h3>
          <button className="text-[10px] font-medium text-brand-primary uppercase tracking-wider hover:underline">
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {recentDraws.map((draw) => (
            <div
              key={draw.id}
              className="p-3 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-gray-400">{draw.id}</span>
                <span className="text-[10px] text-gray-500">{draw.date}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {draw.numbers.map((num) => (
                  <span
                    key={num}
                    className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700"
                  >
                    {num}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600">
                  Jackpot:{' '}
                  <span className="font-bold text-brand-primary">
                    {formatNGN(draw.jackpot)}
                  </span>
                </p>
                {draw.yourTicket && (
                  <span className="text-[10px] font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                    You Played
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loyalty Progress */}
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5">
        <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider font-mono mb-3">
          Loyalty Progress
        </h3>
        <ProgressBar
          value={68}
          max={100}
          label="Tickets to Gold Tier"
          variant="primary"
          showValue
        />
        <p className="text-[10px] text-gray-500 mt-2">
          Play 32 more tickets to unlock Gold Tier benefits
        </p>
      </div>
    </div>
  );
});

ResultsStats.displayName = 'ResultsStats';
export default ResultsStats;