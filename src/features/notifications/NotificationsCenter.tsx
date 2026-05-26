import { memo, useState } from 'react';
import { cn } from '@/utils/cn';
import { GlassCard } from '@/components/common/GlassCard';
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
      title: '🎉 You Won!',
      message: `Congratulations! You won ${formatNGN(5000)} in the King Monthly draw.`,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      actionUrl: '/tickets'
    },
    {
      id: '2',
      type: 'deposit',
      title: '💰 Wallet Funded',
      message: 'Your wallet has been credited with ₦10,000 via Paystack.',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    },
    {
      id: '3',
      type: 'promo',
      title: '🔥 Special Offer',
      message: 'Get 20% bonus on your next deposit. Valid for 24 hours!',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: false,
      actionUrl: '/wallet'
    },
    {
      id: '4',
      type: 'system',
      title: '⚙️ Maintenance Notice',
      message: 'Scheduled maintenance on May 26, 2:00-4:00 AM WAT. Services may be intermittent.',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type: NotificationType) => {
    const icons = {
      win: '🎉',
      deposit: '💰',
      withdrawal: '🏦',
      promo: '🔥',
      system: '⚙️'
    };
    return icons[type];
  };

  const getTypeColor = (type: NotificationType) => {
    const colors = {
      win: 'text-brand-success',
      deposit: 'text-brand-primary',
      withdrawal: 'text-brand-transfer',
      promo: 'text-brand-accent',
      system: 'text-white/60'
    };
    return colors[type];
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="safe-area pt-20 pb-24 px-4 space-y-4 select-none text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
          <h1 className="text-xl font-black text-white font-mono uppercase tracking-wider">
            Notifications
          </h1>
        </div>
        {unreadCount > 0 && (
          <span className="text-[10px] font-bold text-brand-accent bg-brand-accent/20 px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <GlassCard
            key={notification.id}
            className={cn(
              "p-4 cursor-pointer transition-all duration-300 zigzag-bottom relative overflow-hidden",
              !notification.read && "ring-1 ring-pink-500/30 bg-gradient-to-r from-purple-500/5 to-transparent"
            )}
            onClick={() => {
              markAsRead(notification.id);
              if (notification.actionUrl) {
                window.location.href = notification.actionUrl;
              }
            }}
          >
            {/* Unread indicator */}
            {!notification.read && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-purple-500 rounded-l-xl" />
            )}
            
            <div className={cn("flex gap-3", !notification.read && "pl-2")}>
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg",
                getTypeColor(notification.type),
                "bg-white/5 border border-white/10"
              )}>
                {getIcon(notification.type)}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={cn(
                    "font-bold text-sm",
                    !notification.read ? "text-white" : "text-white/90"
                  )}>
                    {notification.title}
                  </h3>
                  <span className="text-[10px] text-white/40 font-mono whitespace-nowrap">
                    {formatDateNG(notification.timestamp, { relative: true })}
                  </span>
                </div>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  {notification.message}
                </p>
                {notification.actionUrl && !notification.read && (
                  <p className="text-[10px] text-brand-primary font-medium mt-2 uppercase tracking-wider">
                    View Details →
                  </p>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <GlassCard className="p-8 text-center text-white/50">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔔</span>
          </div>
          <p className="text-sm">No notifications yet</p>
          <p className="text-xs mt-1">Play more to earn rewards and updates!</p>
        </GlassCard>
      )}
    </div>
  );
});

NotificationsCenter.displayName = 'NotificationsCenter';
export default NotificationsCenter;