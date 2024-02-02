import { Component } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
import { UserEntity } from '@influencer-marketing/shared';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  imports: [SearchComponent, ProfileComponent, NgClass],
})
export class HomePage {
  selectedUser: UserEntity | undefined = {
    user_id: '1494465305',
    username: 'dana',
    fullname: 'Dana Brunetti',
    picture:
      'https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDbrEEwrWumIvR20xZeZXa0LRe%2FXHPXn3VPrjW%2BDHrkn6OZp6uPzLJt7MYq1qAhm7vmtOQT7OzbPAM1V4C0xKhsM',
    followers: 90136,
    is_verified: true,
  };

  onUserSelected(user: UserEntity) {
    this.selectedUser = user;
  }
}
