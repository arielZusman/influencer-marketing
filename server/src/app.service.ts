import { Users } from '@influencer-marketing/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getUserInstagramFeed(id: string): Promise<any> {
    return this.httpService.axiosRef
      .get(`raw/ig/user/feed/?url=${id}`)
      .then((res) => res.data);
  }
  async findUsers(user: string, limit: number): Promise<Users> {
    return this.httpService.axiosRef
      .get(
        `dict/users?q=${user}&limit=${limit}&type=lookalike&platform=instagram`,
      )
      .then((res) => res.data);
  }

  getUserContacts(id: string): Promise<any> {
    return this.httpService.axiosRef
      .get(`exports/contacts?url=${id}`)
      .then((res) => res.data);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
