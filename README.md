
# Notify Hub

> A powerful reminder application that sends notifications via Telegram, email, and web push. Easily create, manage, and schedule reminders across your favorite platforms.

Notify Hub is a modern, single-page application designed for users who need a reliable, multi-channel reminder system. Built with React and TypeScript, it offers a clean, intuitive, and responsive user interface for managing your important tasks and deadlines.

## ✨ Features

- **Multi-Channel Notifications**: Send reminders to Telegram, Email, and as Web Push notifications.
- **CRUD Functionality**: Easily **C**reate, **R**ead, **U**pdate, and **D**elete reminders.
- **Sleek & Modern UI**: A beautiful, responsive interface built with Tailwind CSS, featuring a dark mode theme, smooth animations, and a user-friendly modal-based workflow.
- **Status Tracking**: Reminders are clearly marked with their status (`scheduled`, `sent`, `failed`).
- **Channel Configuration**: A dedicated settings panel to manage connections to your notification services.
- **Zero Dependencies (Frontend)**: The frontend is built with vanilla React and does not require external state management libraries.
- **Extensible**: The component-based architecture makes it easy to add new features or notification channels.

## 🛠️ Tech Stack

This project is a frontend application that simulates the full functionality of the "WhatsApp Nfty" implementation plan. The backend is conceptual but the setup instructions cover how to build it.

- **Frontend**:
  - [React](https://reactjs.org/) (v18)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/) for styling
- **Conceptual Backend**:
  - **Framework**: [Next.js](https://nextjs.org/) (API Routes)
  - **Database**: [PostgreSQL](https://www.postgresql.org/) (e.g., via [Supabase](https://supabase.io/))
  - **Scheduling**: [node-cron](https://www.npmjs.com/package/node-cron) or a queue system like [BullMQ](https://bullmq.io/).
  - **Telegram**: [Telegraf.js](https://telegraf.js.org/)
  - **Email**: [Nodemailer](https://nodemailer.com/) with a service like [SendGrid](https://sendgrid.com/).
  - **Web Push**: [web-push](https://www.npmjs.com/package/web-push) library.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running PostgreSQL database instance (local or cloud-based like Supabase).
- Accounts for Telegram and an email provider (e.g., SendGrid).

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notify-hub.git
cd notify-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup (`.env.local`)

Create a `.env.local` file in the root of the project and add the following environment variables. These are required for the conceptual backend to function.

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Telegram Bot
TELEGRAM_BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN"

# Email Service (e.g., SendGrid)
SENDGRID_API_KEY="YOUR_SENDGRID_API_KEY"
EMAIL_FROM_ADDRESS="noreply@yourdomain.com"

# Web Push (VAPID Keys)
VAPID_PUBLIC_KEY="YOUR_VAPID_PUBLIC_KEY"
VAPID_PRIVATE_KEY="YOUR_VAPID_PRIVATE_KEY"
```

### 4. Database Setup (PostgreSQL)

Connect to your PostgreSQL instance and run the following SQL queries to create the necessary tables.

```sql
-- Users table to store user information and channel IDs
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  telegram_chat_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reminders table
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  channels TEXT[] NOT NULL, -- e.g., {'Telegram', 'Email'}
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, sent, failed
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. Notification Channel Setup

#### Telegram Setup

1.  **Create a Bot**: Open Telegram, search for the `BotFather` user, and start a chat.
2.  Send `/newbot` to `BotFather`.
3.  Follow the prompts to choose a name and username for your bot.
4.  `BotFather` will provide you with a **token**. Copy this token and paste it into `TELEGRAM_BOT_TOKEN` in your `.env.local` file.
5.  To get your `chat_id`, start a chat with your new bot and send a message. Then, visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates` in your browser. You will see a JSON response containing your chat ID.

#### Email Setup (e.g., SendGrid)

1.  Sign up for a free account at [SendGrid](https://sendgrid.com/).
2.  Verify your email address or domain.
3.  Navigate to **Settings -> API Keys** in the SendGrid dashboard.
4.  Create a new API key with "Full Access" or restricted "Mail Send" permissions.
5.  Copy the generated key and paste it as the `SENDGRID_API_KEY` in your `.env.local` file.

#### Web Push Setup (VAPID Keys)

1.  VAPID (Voluntary Application Server Identification) keys are required to send push notifications.
2.  You can generate them easily using the `web-push` library. Run the following command in your terminal:
    ```bash
    npx web-push generate-vapid-keys
    ```
3.  Copy the public and private keys into the `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` fields in your `.env.local` file.

### 6. Run the Application

Once the setup is complete, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## ❓ About "WhatsApp" and "Nfty"

The initial implementation plan referred to "WhatsApp Nfty". This project was built based on that plan with the following clarifications:

-   **Nfty**: This seems to be a shorthand for "Notify" and has evolved into the project name **Notify Hub**.
-   **WhatsApp**: Direct integration with the official WhatsApp Business API is complex and often costly for small projects. The implementation plan explicitly stated **"(no WhatsApp API)"**, opting for Telegram instead, which has a much more accessible bot API. This application follows that direction, using Telegram, Email, and Web Push as its core channels.

