import React from 'react';
import { Reminder } from '../types';
import ReminderList from './ReminderList';
import { PlusIcon } from './icons/PlusIcon';

interface DashboardProps {
  reminders: Reminder[];
  onAddReminder: () => void;
  onEditReminder: (reminder: Reminder) => void;
  onDeleteReminder: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  reminders,
  onAddReminder,
  onEditReminder,
  onDeleteReminder,
}) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Your Reminders</h2>
          <p className="text-[var(--muted-foreground)] mt-1">
            Here's a list of your upcoming and past reminders.
          </p>
        </div>
        <button
          onClick={onAddReminder}
          className="flex items-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold px-5 py-2.5 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] hover:opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
        >
          <PlusIcon className="w-5 h-5" />
          Add Reminder
        </button>
      </div>
      <ReminderList
        reminders={reminders}
        onEdit={onEditReminder}
        onDelete={onDeleteReminder}
      />
    </div>
  );
};

export default Dashboard;