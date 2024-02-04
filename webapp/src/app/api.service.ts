import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  PostResponse,
  UserProfileResponse,
  UserEntity,
  Users,
} from '@influencer-marketing/shared';
import {
  Observable,
  catchError,
  map,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }

  findUsers(user: string, limit = 10): Observable<UserEntity[]> {
    user = user.trim();
    const options = {
      params: new HttpParams().set('limit', limit).set('user', user),
    };

    return this.http.get<Users>('api/users', options).pipe(
      map((res) => res.data || []),
      catchError(this.handleError),

      shareReplay(),
    );
  }

  getUserPosts(user: string, endCursor = ''): Observable<PostResponse> {
    const options = {
      params: new HttpParams().set('user', user).set('after', endCursor),
    };

    return this.http
      .get<PostResponse>('api/user/feed', options)
      .pipe(catchError(this.handleError), shareReplay());
  }

  getUserContacts(user: string): Observable<UserProfileResponse> {
    const options = {
      params: new HttpParams().set('user', user),
    };

    return this.http
      .get<UserProfileResponse>('api/user/contacts', options)
      .pipe(catchError(this.handleError), shareReplay());
  }
}
