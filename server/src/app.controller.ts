import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from '@influencer-marketing/shared';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  findUsers(
    @Query('user') user: string,
    @Query('limit') limit: number,
  ): Promise<Users> {
    return this.appService.findUsers(user, limit);
  }

  @Get('user/ig/feed')
  getUserInstagramFeed(@Query('id') id: string): Promise<any> {
    return this.appService.getUserInstagramFeed(id);
  }

  @Get('user/contacts')
  getUserContacts(@Query('id') id: string): Promise<any> {
    return this.appService.getUserContacts(id);
  }
}
