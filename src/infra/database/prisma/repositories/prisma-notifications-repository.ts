import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationMapper } from '@infra/database/mappers/prisma-notification-mapper';
import { raw } from '@prisma/client/runtime';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyRecipientId(recipientId: string): Promise<number> {
    const countNotification = this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return countNotification;
  }

  async create(notification: Notification): Promise<void> {
    const persistentNotification =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: persistentNotification,
    });
  }

  async save(notification: Notification): Promise<void> {
    const persistentNotification =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: persistentNotification.id,
      },
      data: persistentNotification,
    });
  }
}
