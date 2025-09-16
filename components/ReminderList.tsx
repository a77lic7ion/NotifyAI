import React from 'react';
import { Reminder } from '../types';
import ReminderItem from './ReminderItem';

interface ReminderListProps {
  reminders: Reminder[];
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({ reminders, onEdit, onDelete }) => {
  if (reminders.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-[var(--card)] rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--border)]">
        <h3 className="text-xl font-semibold text-[var(--card-foreground)]">No Reminders Yet</h3>
        <p className="text-[var(--muted-foreground)] mt-2">Click "Add Reminder" to get started!</p>
      </div>
    );
  }

  const sortedReminders = [...reminders].sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  return (
    <div className="space-y-4">
      {sortedReminders.map(reminder => (
        <ReminderItem
          key={reminder.id}
          reminder={reminder}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReminderList;