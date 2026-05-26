import { memo, useState } from 'react';
import { cn } from '@/utils/cn';
import { formatNGN, formatDateNG } from '@/utils/formatters';

type NotificationType = 'win' | 'deposit' | 'withdrawal' | 'promo' | 'system';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
};

export const NotificationsCenter = memo(() => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'win',
      title: 'You Won!',
      message: `Congratulations! You won ${formatNGN(5000)} in the King Monthly draw.`,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      actionUrl: '/tickets',
    },
    {
      id: '2',
      type: 'deposit',
      title: 'Wallet Funded',
      message: 'Your wallet has been credited with ₦10,000 via Paystack.',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
    {
      id: '3',
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 20% bonus on your next deposit. Valid for 24 hours!',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: false,
      actionUrl: '/wallet',
    },
    {
      id: '4',
      type: 'system',
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance on May 26, 2:00-4:00 AM WAT. Services may be intermittent.',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: NotificationType) => {
    const icons: Record<NotificationType, React.ReactNode> = {
      win: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      deposit: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      withdrawal: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      promo: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      system: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[type];
  };

  const getTypeColor = (type: NotificationType) => {
    const colors: Record<NotificationType, string> = {
      win: 'text-brand-success',
      deposit: 'text-brand-primary',
      withdrawal: 'text-amber-600',
      promo: 'text-brand-primary',
      system: 'text-gray-500',
    };
    return colors[type];
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="safe-area pt-6 pb-24 px-4 bg-base-body text-gray-900 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[3px] bg-brand-primary rounded-full" />
          <h1 className="text-2xl font-black font-mono uppercase tracking-wider text-gray-900">
            Notifications
          </h1>
        </div>
        {unreadCount > 0 && (
          <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => {
              markAsRead(notification.id);
              if (notification.actionUrl) {
                window.location.href = notification.actionUrl;
              }
            }}
            className={cn(
              'relative overflow-hidden rounded-2xl border bg-white p-4 cursor-pointer transition-all duration-200',
              notification.read
                ? 'border-gray-200 shadow-sm'
                : 'border-brand-primary/30 shadow-md ring-1 ring-brand-primary/20 bg-brand-primary/[0.02]'
            )}
          >
            {/* Unread indicator */}
            {!notification.read && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-primary rounded-l-2xl" />
            )}

            <div className={cn('flex gap-3', !notification.read && 'pl-2')}>
              {/* Icon */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                  'bg-gray-50 border border-gray-200',
                  getTypeColor(notification.type)
                )}
              >
                {getIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={cn(
                      'font-bold text-sm',
                      !notification.read ? 'text-gray-900' : 'text-gray-600'
                    )}
                  >
                    {notification.title}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap">
                    {formatDateNG(notification.timestamp, { relative: true })}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {notification.message}
                </p>
                {notification.actionUrl && !notification.read && (
                  <p className="text-[10px] font-medium text-brand-primary mt-2 uppercase tracking-wider hover:underline">
                    View Details →
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-400">No notifications yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Play more to earn rewards and updates!
          </p>
        </div>
      )}
    </div>
  );
});

NotificationsCenter.displayName = 'NotificationsCenter';
export default NotificationsCenter;