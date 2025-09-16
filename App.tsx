import React, { useState, useCallback, useEffect } from 'react';
import { Reminder, NotificationChannel } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ReminderFormModal from './components/ReminderFormModal';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      message: 'Team stand-up meeting',
      dateTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
      channels: [NotificationChannel.Telegram, NotificationChannel.Email],
      status: 'scheduled',
    },
    {
      id: '2',
      message: 'Deploy new feature to production',
      dateTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
      channels: [NotificationChannel.Email],
      status: 'scheduled',
    },
    {
      id: '3',
      message: 'Pay monthly bills',
      dateTime: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      channels: [NotificationChannel.WebPush, NotificationChannel.Email],
      status: 'sent',
    },
  ]);

  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  // Centralized connection status state with localStorage persistence
  const [isTelegramConnected, setIsTelegramConnected] = useState<boolean>(() => 
    JSON.parse(localStorage.getItem('isTelegramConnected') || 'false')
  );
  const [isEmailConnected, setIsEmailConnected] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem('isEmailConnected') || 'false')
  );
  const [isWebPushConnected, setIsWebPushConnected] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem('isWebPushConnected') || 'false')
  );

  useEffect(() => {
    localStorage.setItem('isTelegramConnected', JSON.stringify(isTelegramConnected));
  }, [isTelegramConnected]);

  useEffect(() => {
    localStorage.setItem('isEmailConnected', JSON.stringify(isEmailConnected));
  }, [isEmailConnected]);

  useEffect(() => {
    localStorage.setItem('isWebPushConnected', JSON.stringify(isWebPushConnected));
  }, [isWebPushConnected]);

  const handleOpenAddModal = useCallback(() => {
    setEditingReminder(null);
    setIsReminderModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((reminder: Reminder) => {
    setEditingReminder(reminder);
    setIsReminderModalOpen(true);
  }, []);

  const handleCloseReminderModal = useCallback(() => {
    setIsReminderModalOpen(false);
    setEditingReminder(null);
  }, []);

  const handleSaveReminder = useCallback((reminder: Omit<Reminder, 'id' | 'status'>) => {
    if (editingReminder) {
      setReminders(prev =>
        prev.map(r =>
          r.id === editingReminder.id ? { ...editingReminder, ...reminder } : r
        )
      );
    } else {
      setReminders(prev => [
        ...prev,
        { ...reminder, id: new Date().toISOString(), status: 'scheduled' },
      ]);
    }
    handleCloseReminderModal();
  }, [editingReminder, handleCloseReminderModal]);
  
  const handleDeleteReminder = useCallback((id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] font-[var(--font-sans)]">
      <Header onOpenSettings={() => setIsSettingsModalOpen(true)} />
      <main className="container mx-auto p-4 md:p-8">
        <Dashboard
          reminders={reminders}
          onAddReminder={handleOpenAddModal}
          onEditReminder={handleOpenEditModal}
          onDeleteReminder={handleDeleteReminder}
        />
      </main>
      {isReminderModalOpen && (
        <ReminderFormModal
          isOpen={isReminderModalOpen}
          onClose={handleCloseReminderModal}
          onSave={handleSaveReminder}
          reminder={editingReminder}
        />
      )}
      {isSettingsModalOpen && (
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          isTelegramConnected={isTelegramConnected}
          setIsTelegramConnected={setIsTelegramConnected}
          isEmailConnected={isEmailConnected}
          setIsEmailConnected={setIsEmailConnected}
          isWebPushConnected={isWebPushConnected}
          setIsWebPushConnected={setIsWebPushConnected}
        />
      )}
    </div>
  );
};

export default App;