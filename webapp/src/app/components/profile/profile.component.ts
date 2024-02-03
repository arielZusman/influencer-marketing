import { Component, Input, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserEntity } from '@influencer-marketing/shared';
import { NumberFormatPipe } from '../../number-format.pipe';
import { IconComponent } from '../icon/icon.component';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { ApiService } from '../../api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  host: {
    class: 'block bg-gray-100 px-8',
  },
  imports: [MatIconModule, NumberFormatPipe, IconComponent, AsyncPipe],
})
export class ProfileComponent {
  private apiService = inject(ApiService)

  private userSubject = new Subject<UserEntity>();

  user$ = this.userSubject.asObservable()
  posts$ = this.userSubject.pipe(
    switchMap((user) => {
      return this.apiService.getUserPosts(user.username)
    })
  )

  @Input()
  set user(user: UserEntity) {
    this.userSubject.next(user);
  }
}
