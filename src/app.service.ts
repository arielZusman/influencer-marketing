import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Users } from './models';
import {} from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getUserInstagramFeed(id: string): Promise<any> {
    return this.httpService.axiosRef
      .get(`raw/ig/user/feed/?url=${id}`)
      .then((res) => res.data);
  }
  async findUsers(user: string): Promise<Users> {
    return this.httpService.axiosRef
      .get(`dict/users?q=${user}&limit=1&type=lookalike&platform=instagram`)
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
