import axios from 'axios';

interface Notification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

export async function sendNotification(notification: Notification): Promise<void> {
  // Send to Slack
  if (process.env.SLACK_WEBHOOK_URL) {
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `${notification.type === 'error' ? '🚨' : '✅'} *${notification.title}*\n${notification.message}`
    });
  }

  // Send to email
  if (process.env.ADMIN_EMAIL) {
    // Implement email notification here
    // You can use nodemailer or any other email service
  }

  // Log to monitoring service
  console.log(`[${notification.type.toUpperCase()}] ${notification.title}: ${notification.message}`);
}