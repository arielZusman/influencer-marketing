import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ItemResponse,
  PostResponse,
  UserEntity,
} from '@influencer-marketing/shared';
import { BehaviorSubject, Observable, of, scan, switchMap, tap } from 'rxjs';
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

  user$ = this.userSubject.asObservable();
  posts$ = this.activatedRoute.queryParams.pipe(
    switchMap((params) => {
      const username = params['user']
        ? params['user']
        : this.userSubject.getValue()?.username;
      return this.getUserPosts(username, this.endCursor).pipe(
        scan(
          (
            acc: Partial<PostResponse>,
            { items, more_available, end_cursor, status },
          ) => {
            return {
              items: acc.items ? acc.items.concat(items) : items,
              more_available,
              end_cursor,
              status,
            };
          },
          {
            items: [] as ItemResponse[],
          },
        ),
      );
    }),
    tap((posts) => {
      if (posts?.end_cursor) {
        this.endCursor = posts.end_cursor;
      }
    }),
  );
  constructor() {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          if (!this.isUserSubjectSet && params['user']) {
            const username = params['user'];
            return this.findUsers(username);
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

  findUsers(val: string): Observable<UserEntity[]> {
    return this.apiService.findUsers(val);
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
}
