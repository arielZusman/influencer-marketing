import {
  ItemResponse,
  MediaType,
  PostResponse,
  PostResult,
  Users,
} from '@influencer-marketing/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

const MediaTypeRef: Record<number, MediaType> = {
  1: 'IMAGE',
  2: 'VIDEO',
  8: 'CAROUSEL_ALBUM',
} as const;

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getUserInstagramFeed(
    user: string,
    endCursor?: string,
  ): Promise<PostResponse> {
    let url = `raw/ig/user/feed/?url=${user}`;

    url = endCursor ? url + `&after=${endCursor}` : url;

    const result = await this.httpService.axiosRef.get<PostResult>(url);
    const items: ItemResponse[] = result.data.items.map(
      ({ display_url, code, comment_count, like_count, media_type }) => ({
        display_url,
        code,
        comment_count,
        like_count,
        media_type: MediaTypeRef[media_type],
      }),
    );
    const { more_available, end_cursor, status } = result.data;
    return {
      items,
      more_available,
      end_cursor,
      status,
    };
  }
  async findUsers(user: string, limit: number): Promise<Users> {
    const result = await this.httpService.axiosRef.get(
      `dict/users?q=${user}&limit=${limit}&type=lookalike&platform=instagram`,
    );

    return result.data;
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
