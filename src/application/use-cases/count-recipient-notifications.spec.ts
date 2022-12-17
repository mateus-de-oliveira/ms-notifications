import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';

import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });

  // it('shold not be able to cancel a non existing notification', async () => {
  //   const notificationsRepository = new InMemoryNotificationRepository();
  //   const countRecipientNotification = new CountRecipientNotification(
  //     notificationsRepository,
  //   );

  //   expect(() => {
  //     return countRecipientNotification.execute({ notificationId: 'id-faker' });
  //   }).rejects.toThrow(NotificationNotFound);
  // });
});
