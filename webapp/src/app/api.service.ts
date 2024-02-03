import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserEntity, Users } from '@influencer-marketing/shared';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  findUsers(user: string, limit = 10): Observable<UserEntity[]> {
    user = user.trim();
    const options = {
      params: new HttpParams().set('limit', limit).set('user', user),
    };

    return this.http
      .get<Users>('api/users', options)
      .pipe(map((res) => res.data || []));
  }

  getUserPosts(user: string, endCursor = '') {
    const options = {
      params: new HttpParams().set('user', user),
    };

    if (endCursor) {
      options.params.set('endCursor', endCursor);
    }

    return this.http.get('api/user/feed');
  }
}
