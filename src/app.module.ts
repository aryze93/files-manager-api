import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoldersModule } from './folders/folders.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './folders/entities/folder.entity';
import { DocFilesModule } from './docFiles/docFiles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DocFile } from './docFiles/entities/docFile.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt-auth.guard';
import { JwtStrategy } from './auth/strategies/jwt-strategy';
import { RefreshJwtStrategy } from './auth/strategies/refreshToken.strategy';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      entities: [Folder, DocFile, User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    FoldersModule,
    DocFilesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly adminRepository: UsersService) {}

  async onModuleInit() {
    await this._initAppDefaultAdmin();
  }

  private async _initAppDefaultAdmin() {
    const defaultAdminData = {
      username: process.env.DEFAULT_ADMIN_USERNAME,
      password: process.env.DEFAULT_ADMIN_PASSWORD,
    };

    // Check if ADMIN exists
    const admin = await this.adminRepository.findOneWithUserName(
      defaultAdminData.username,
    );

    if (!admin) {
      await this.adminRepository.create({
        ...defaultAdminData,
      });
      console.log(
        `New Super admin has been created: ${defaultAdminData.username}/${defaultAdminData.password}`,
      );
      return;
    }

    console.log(
      `Super admin already exists: ${defaultAdminData.username}/${defaultAdminData.password}`,
    );
  }
}
