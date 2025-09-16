import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { EmailIcon } from './icons/EmailIcon';
import { WebPushIcon } from './icons/WebPushIcon';
import { NotificationChannel } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isTelegramConnected: boolean;
  setIsTelegramConnected: (value: boolean) => void;
  isEmailConnected: boolean;
  setIsEmailConnected: (value: boolean) => void;
  isWebPushConnected: boolean;
  setIsWebPushConnected: (value: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose,
  isTelegramConnected,
  setIsTelegramConnected,
  isEmailConnected,
  setIsEmailConnected,
  isWebPushConnected,
  setIsWebPushConnected,
}) => {
  const [activeTab, setActiveTab] = useState<NotificationChannel>(NotificationChannel.Telegram);
  
  // State for form inputs
  const [telegramBotToken, setTelegramBotToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  if (!isOpen) return null;

  const handleTelegramConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (telegramBotToken && telegramChatId) {
      // Simulate API call
      console.log('Connecting Telegram:', { telegramBotToken, telegramChatId });
      setIsTelegramConnected(true);
    } else {
      alert('Please fill in both Bot Token and Chat ID.');
    }
  };

  const handleEmailConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailAddress) {
      console.log('Connecting Email:', { emailAddress });
      setIsEmailConnected(true);
    } else {
      alert('Please enter your email address.');
    }
  };

  const handleWebPushConnect = () => {
    // Simulate asking for browser permission
    console.log('Requesting Web Push permission...');
    alert('Browser notifications enabled!');
    setIsWebPushConnected(true);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case NotificationChannel.Telegram:
        return (
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Connect to Telegram</h3>
            {isTelegramConnected ? (
              <div className="text-center">
                <p className="text-green-400 mb-4">✅ Telegram Connected Successfully!</p>
                <button
                  onClick={() => setIsTelegramConnected(false)}
                  className="w-full bg-[var(--destructive)] text-[var(--destructive-foreground)] font-semibold py-2 px-4 rounded-[var(--radius-lg)] hover:opacity-90 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <form onSubmit={handleTelegramConnect} className="space-y-4">
                <p className="text-[var(--muted-foreground)] text-sm">Follow these steps to get your credentials:</p>
                <ol className="list-decimal list-inside text-sm text-[var(--muted-foreground)] space-y-1">
                  <li>Open Telegram and search for <strong className="text-[var(--primary)]">@BotFather</strong>.</li>
                  <li>Type `/newbot` and follow the instructions to get your <strong className="text-[var(--primary)]">Bot Token</strong>.</li>
                  <li>Find <strong className="text-[var(--primary)]">@userinfobot</strong>, start it, and it will give you your <strong className="text-[var(--primary)]">Chat ID</strong>.</li>
                </ol>
                <div>
                  <label htmlFor="botToken" className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">Bot Token</label>
                  <input id="botToken" type="text" value={telegramBotToken} onChange={e => setTelegramBotToken(e.target.value)} className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[var(--radius-lg)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" placeholder="Enter Bot Token" />
                </div>
                <div>
                  <label htmlFor="chatId" className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">Chat ID</label>
                  <input id="chatId" type="text" value={telegramChatId} onChange={e => setTelegramChatId(e.target.value)} className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[var(--radius-lg)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" placeholder="Enter Chat ID" />
                </div>
                <button type="submit" className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-2 px-4 rounded-[var(--radius-lg)] hover:opacity-90 transition-colors">Connect</button>
              </form>
            )}
          </div>
        );
      case NotificationChannel.Email:
        return (
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Connect Email</h3>
            {isEmailConnected ? (
               <div className="text-center">
                <p className="text-green-400 mb-4">✅ Email Connected Successfully!</p>
                <button
                  onClick={() => setIsEmailConnected(false)}
                  className="w-full bg-[var(--destructive)] text-[var(--destructive-foreground)] font-semibold py-2 px-4 rounded-[var(--radius-lg)] hover:opacity-90 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailConnect} className="space-y-4">
                 <p className="text-[var(--muted-foreground)] text-sm">Enter your email address to receive notifications.</p>
                 <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--muted-foreground)] mb-1">Email Address</label>
                  <input id="email" type="email" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} className="w-full bg-[var(--input)] border border-[var(--border)] rounded-[var(--radius-lg)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]" placeholder="you@example.com" />
                </div>
                <button type="submit" className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-2 px-4 rounded-[var(--radius-lg)] hover:opacity-90 transition-colors">Connect</button>
              </form>
            )}
          </div>
        );
      case NotificationChannel.WebPush:
        return (
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Enable Web Push</h3>
            {isWebPushConnected ? (
               <div className="text-center">
                <p className="text-green-400 mb-4">✅ Web Push Notifications Enabled!</p>
                <button
                  onClick={() => setIsWebPushConnected(false)}
                  className="w-full bg-[var(--destructive)] text-[var(--destructive-foreground)] font-semibold py-2 px-4 rounded-[var(--radius-lg)] hover:opacity-90 transition-colors"
                >
                  Disable
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-[var(--muted-foreground)] text-sm">Enable browser notifications to get reminders directly on your desktop.</p>
                <button
                  onClick={handleWebPushConnect}
                  className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-2 px-4 rounded-[var(--radius-lg)] hover:opacity-90 transition-colors"
                >
                  Enable Notifications
                </button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: NotificationChannel.Telegram, name: 'Telegram', icon: TelegramIcon },
    { id: NotificationChannel.Email, name: 'Email', icon: EmailIcon },
    { id: NotificationChannel.WebPush, name: 'Web Push', icon: WebPushIcon },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-2xl)] w-full max-w-lg border border-[var(--border)] flex flex-col" style={{ height: 'auto', maxHeight: '90vh' }}>
        <div className="flex justify-between items-center p-4 border-b border-[var(--border)] flex-shrink-0">
          <h2 className="text-xl font-bold text-[var(--card-foreground)]">Notification Settings</h2>
          <button type="button" onClick={onClose} className="p-1 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors" aria-label="Close modal">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          <div className="flex-shrink-0 border-b md:border-b-0 md:border-r border-[var(--border)]">
            <div className="p-2 md:p-4" role="tablist" aria-orientation="vertical">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-[var(--radius-lg)] text-left transition-colors mb-1 ${
                      isActive ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-semibold">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-6 overflow-y-auto flex-grow">
            {renderTabContent()}
          </div>
        </div>

        <div className="flex justify-end p-4 bg-[var(--card)]/50 border-t border-[var(--border)] rounded-b-[var(--radius-xl)] flex-shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2 bg-[var(--secondary)] text-[var(--secondary-foreground)] font-semibold rounded-[var(--radius-lg)] hover:bg-[var(--muted)] transition-colors">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;