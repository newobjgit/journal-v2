import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service'
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolModule } from './school/school.module';
import { UserModule } from './user/user.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    SharedModule,
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.throttlerConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.mongoMainConfig,
      connectionName: 'main',
    }),
    SchoolModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppGateway,
  ],
})
export class AppModule {}
