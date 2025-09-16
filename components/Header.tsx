import React from 'react';
import { SettingsIcon } from './icons/SettingsIcon';

interface HeaderProps {
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="bg-[var(--card)]/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4 border-b border-[var(--border)]">
        <h1 className="text-2xl font-bold text-[var(--primary)] tracking-tight">
          Notify Hub
        </h1>
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          aria-label="Open settings"
        >
          <SettingsIcon className="w-6 h-6 text-[var(--muted-foreground)]" />
        </button>
      </div>
    </header>
  );
};

export default Header;