import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TweetsController } from './tweets/tweets.controller';
import { TweetsService } from './tweets/tweets.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'this_is_secret', //key that locks the token
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  controllers: [AuthController, TweetsController, UsersController],
  providers: [PrismaService, AuthService, TweetsService, UsersService],
})
export class AppModule {}
