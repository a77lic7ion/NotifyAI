import React, { useState, useEffect } from 'react';
import { Reminder, NotificationChannel } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ReminderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminder: Omit<Reminder, 'id' | 'status'>) => void;
  reminder: Reminder | null;
}

const ReminderFormModal: React.FC<ReminderFormModalProps> = ({ isOpen, onClose, onSave, reminder }) => {
  const [message, setMessage] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [channels, setChannels] = useState<NotificationChannel[]>([]);

  useEffect(() => {
    if (reminder) {
      setMessage(reminder.message);
      const reminderDate = new Date(reminder.dateTime);
      // Format to YYYY-MM-DDTHH:mm
      const localDateTime = new Date(reminderDate.getTime() - reminderDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      setDateTime(localDateTime);
      setChannels(reminder.channels);
    } else {
      setMessage('');
      setDateTime('');
      setChannels([]);
    }
  }, [reminder, isOpen]);

  const handleChannelToggle = (channel: NotificationChannel) => {
    setChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !dateTime || channels.length === 0) {
      alert('Please fill all fields and select at least one channel.');
      return;
    }
    onSave({ message, dateTime: new Date(dateTime).toISOString(), channels });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--popover)] rounded-[var(--radius-xl)] shadow-[var(--shadow-2xl)] w-full max-w-md border border-[var(--border)]">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b border-[var(--border)]">
            <h2 className="text-xl font-bold text-[var(--popover-foreground)]">{reminder ? 'Edit Reminder' : 'Add Reminder'}</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Message</label>
              <input
                id="message"
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[var(--radius-lg)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                required
              />
            </div>

            <div>
              <label htmlFor="dateTime" className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Date & Time</label>
              <input
                id="dateTime"
                type="datetime-local"
                value={dateTime}
                onChange={e => setDateTime(e.target.value)}
                className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[var(--radius-lg)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">Notification Channels</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(NotificationChannel).map(channel => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => handleChannelToggle(channel)}
                    className={`px-3 py-2 text-sm font-semibold rounded-[var(--radius-lg)] transition-colors border ${
                      channels.includes(channel)
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                        : 'bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--border)] hover:bg-[var(--muted)]'
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end p-4 bg-[var(--popover)]/50 border-t border-[var(--border)] rounded-b-[var(--radius-xl)]">
            <button type="button" onClick={onClose} className="px-4 py-2 text-[var(--muted-foreground)] font-semibold rounded-[var(--radius-lg)] hover:bg-[var(--secondary)] transition-colors mr-2">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold rounded-[var(--radius-lg)] hover:opacity-90 transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderFormModal;