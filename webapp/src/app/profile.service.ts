import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ItemResponse,
  PostResponse,
  UserEntity,
} from '@influencer-marketing/shared';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private userSubject = new BehaviorSubject<UserEntity | null>(null);
  private isUserSubjectSet = false;
  private endCursor: string = '';

  private loadMoreSubject = new BehaviorSubject<string>('');
  private query$ = this.activatedRoute.queryParams.pipe(
    map((param) => param['user']),
    distinctUntilChanged(),
  );
  user$ = this.userSubject.asObservable();
  posts$ = combineLatest([this.query$, this.loadMoreSubject]).pipe(
    switchMap(([username, endCursor]) => {
      username = username ? username : this.userSubject.getValue()?.username;

      if (!username) {
        return of({} as PostResponse);
      }
      return this.getUserPosts(username, endCursor);
    }),
    scan((acc: PostResponse, { items, more_available, end_cursor, status }) => {
      return {
        items: acc.items ? acc.items.concat(items) : items,
        more_available,
        end_cursor,
        status,
      };
    }),
    tap(console.log),
  );

  constructor() {
    this.query$
      .pipe(
        switchMap((user) => {
          if (!this.isUserSubjectSet && user) {
            const username = user;
            return this.findUsers(username, 1);
          }
          return of(null);
        }),
      )
      .subscribe((users) => {
        if (users && users.length) {
          this.userSubject.next(users[0]);
        }
      });
  }

  findUsers(val: string, limit: number): Observable<UserEntity[]> {
    return this.apiService.findUsers(val, limit);
  }

  getUserPosts(val: string, endCursor?: string) {
    return this.apiService.getUserPosts(val, endCursor);
  }

  set selectedUser(val: UserEntity) {
    this.userSubject.next(val);
    this.isUserSubjectSet = true;
    this.router.navigate([], {
      queryParams: {
        user: val.username,
      },
    });
  }

  loadMore(endCursor: string) {
    this.loadMoreSubject.next(endCursor);
  }
}
