import { Component } from '@angular/core';
import { SearchComponent } from '../components/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  imports: [SearchComponent],
})
export class HomePage {}
