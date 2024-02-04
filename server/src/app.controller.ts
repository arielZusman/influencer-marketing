import {
  PostResponse,
  UserProfileResponse,
  Users,
} from '@influencer-marketing/shared';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  findUsers(
    @Query('user') user: string,
    @Query('limit') limit: number,
  ): Promise<Users> {
    return this.appService.findUsers(user, limit);
  }

  @Get('user/feed')
  getUserInstagramFeed(
    @Query('user') user: string,
    @Query('endCursor') endCursor: string,
  ): Promise<PostResponse> {
    return this.appService.getUserInstagramFeed(user, endCursor);
  }

  @Get('user/contacts')
  getUserContacts(@Query('user') user: string): Promise<UserProfileResponse> {
    return this.appService.getUserContacts(user);
  }
}
