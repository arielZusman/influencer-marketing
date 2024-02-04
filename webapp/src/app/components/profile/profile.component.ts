import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NumberFormatPipe } from '../../number-format.pipe';
import { ProfileService } from '../../profile.service';
import { IconComponent } from '../icon/icon.component';
import { PostComponent } from '../post/post.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'block bg-gray-100 px-8',
  },
  imports: [
    MatIconModule,
    NumberFormatPipe,
    IconComponent,
    AsyncPipe,
    PostComponent,
    MatButtonModule,
  ],
})
export class ProfileComponent {
  private profileService = inject(ProfileService);

  user$ = this.profileService.user$;
  posts$ = this.profileService.posts$;

  loadMore(endCursor: string) {
    this.profileService.loadMore(endCursor);
  }
}
