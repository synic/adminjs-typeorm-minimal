import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Thing } from './thing.entity';
import { defaultConfig } from './orm.config';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminModule.createAdminAsync({
      imports: [TypeOrmModule.forFeature([Thing])],
      inject: [getRepositoryToken(Thing)],
      useFactory: () => ({
        auth: {
          authenticate: async () => Promise.resolve({ email: 'test@test.com' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
        adminJsOptions: {
          rootPath: '/admin',
          resources: [Thing],
        },
      }),
    }),
    TypeOrmModule.forRoot(defaultConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
