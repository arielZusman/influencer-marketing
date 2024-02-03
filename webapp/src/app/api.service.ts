import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PostResponse, UserEntity, Users } from '@influencer-marketing/shared';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  findUsers(user: string, limit = 10): Observable<UserEntity[]> {
    user = user.trim();
    const options = {
      params: new HttpParams().set('limit', limit).set('user', user),
    };

    return this.http
      .get<Users>('api/users', options)
      .pipe(map((res) => res.data || []));
  }

  getUserPosts(user: string, endCursor?: string): Observable<PostResponse> {
    const options = {
      params: new HttpParams().set('user', user),
    };

    if (endCursor) {
      options.params.set('endCursor', endCursor);
    }

    return this.http.get<PostResponse>('api/user/feed', options);
  }
}
