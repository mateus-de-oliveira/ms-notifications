import { SendNotification } from '@application/use-cases/send-notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'Isso é uma notificação',
      category: 'social',
      recipientId: 'example-uuid',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
