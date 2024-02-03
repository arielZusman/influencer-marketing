import { Component, Input, inject } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
import { UserEntity } from '@influencer-marketing/shared';
import { NgClass } from '@angular/common';
import { ApiService } from '../api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  imports: [SearchComponent, ProfileComponent, NgClass],
})
export class HomePage {
  private apiService = inject(ApiService);
  
  @Input() set user(val: string) {
    if(val && !this.selectedUser) {
      this.apiService.findUsers(val, 1).subscribe(res => {
        this.selectedUser = res[0]
      })
    }
    
  }
  selectedUser!: UserEntity;

  onUserSelected(user: UserEntity) {
    this.selectedUser = user;
  }
}
