import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileComponent } from '../components/profile/profile.component';
import { SearchComponent } from '../components/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  imports: [SearchComponent, ProfileComponent, NgClass],
})
export class HomePageComponent {}
