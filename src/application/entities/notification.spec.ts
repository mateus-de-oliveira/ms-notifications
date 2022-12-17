import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';

describe('Notification', () => {
  it('should be able to create a notification content', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma nova notificação'),
      category: 'social',
      recipientId: 'example-uuid',
    });

    expect(notification).toBeTruthy();
  });
});
