import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService, TokenService],
})
export class AppModule {}
