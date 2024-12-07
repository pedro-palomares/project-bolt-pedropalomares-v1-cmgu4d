import { describe, it, expect, vi } from 'vitest';
import { sendNotification } from '../notifications';
import axios from 'axios';

vi.mock('axios');

describe('Backup Notifications', () => {
  it('should send Slack notification when webhook URL is configured', async () => {
    process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/test';
    
    await sendNotification({
      type: 'success',
      title: 'Test Notification',
      message: 'Test message'
    });
    
    expect(axios.post).toHaveBeenCalledWith(
      'https://hooks.slack.com/test',
      expect.objectContaining({
        text: expect.stringContaining('Test Notification')
      })
    );
  });

  it('should handle notification failures gracefully', async () => {
    vi.mocked(axios.post).mockRejectedValueOnce(new Error('Network error'));
    
    await expect(sendNotification({
      type: 'error',
      title: 'Test Error',
      message: 'Test error message'
    })).resolves.not.toThrow();
  });
});