import { Module } from '@nestjs/common';
import { NotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationsRepository } from '@infra/database/prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
