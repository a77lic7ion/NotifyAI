import React from 'react';
import { Reminder, NotificationChannel } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { EmailIcon } from './icons/EmailIcon';
import { WebPushIcon } from './icons/WebPushIcon';

interface ReminderItemProps {
  reminder: Reminder;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

const ChannelIcon: React.FC<{ channel: NotificationChannel }> = ({ channel }) => {
  const iconMap = {
    [NotificationChannel.Telegram]: <TelegramIcon className="w-5 h-5 text-[var(--chart-1)]" />,
    [NotificationChannel.Email]: <EmailIcon className="w-5 h-5 text-[var(--chart-2)]" />,
    [NotificationChannel.WebPush]: <WebPushIcon className="w-5 h-5 text-[var(--chart-3)]" />,
  };
  return <div title={channel}>{iconMap[channel]}</div>;
};

const StatusBadge: React.FC<{ status: Reminder['status'] }> = ({ status }) => {
  const statusClasses = {
    scheduled: 'bg-[var(--secondary)]/50 text-[var(--secondary-foreground)] border-[var(--secondary)]',
    sent: 'bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/30',
    failed: 'bg-[var(--destructive)]/20 text-[var(--destructive)] border-[var(--destructive)]/30',
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize border ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

const ReminderItem: React.FC<ReminderItemProps> = ({ reminder, onEdit, onDelete }) => {
  const { id, message, dateTime, channels, status } = reminder;
  const date = new Date(dateTime);
  
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-md)] border border-[var(--border)] transition-all hover:border-[var(--primary)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[var(--card-foreground)] font-medium text-lg">{message}</p>
          <div className="text-sm text-[var(--muted-foreground)] mt-1">
            <span>{date.toLocaleDateString()}</span> at <span>{date.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-2">
            {channels.map(channel => <ChannelIcon key={channel} channel={channel} />)}
          </div>
          <StatusBadge status={status} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(reminder)}
              className="p-2 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Edit reminder"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--destructive)] transition-colors"
              aria-label="Delete reminder"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderItem;