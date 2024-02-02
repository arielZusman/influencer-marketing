import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserEntity } from '@influencer-marketing/shared';
import { NumberFormatPipe } from "../../number-format.pipe";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [MatIconModule, NumberFormatPipe]
})
export class ProfileComponent {
  @Input() user: UserEntity | undefined = {
    user_id: '1494465305',
    username: 'dana',
    fullname: 'Dana Brunetti',
    picture:
      'https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDbrEEwrWumIvR20xZeZXa0LRe%2FXHPXn3VPrjW%2BDHrkn6OZp6uPzLJt7MYq1qAhm7vmtOQT7OzbPAM1V4C0xKhsM',
    followers: 90136,
    is_verified: true,
  };
}
