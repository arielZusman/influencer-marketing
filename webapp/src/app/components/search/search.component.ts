import { AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component } from '@angular/core';
import { Observable, map, of, startWith } from 'rxjs';
import { NumberFormatPipe } from '../../number-format.pipe';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    NumberFormatPipe,
    MatIconModule,
  ],
})
export class SearchComponent {
  filteredUsers: Observable<any[]>;
  userCtrl = new FormControl();

  constructor() {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(''),
      map((user) => this.users.filter((u) => u.username.includes(user))),
    );
  }
  users = [
    {
      user_id: '186904952',
      username: 'davidbeckham',
      fullname: 'David Beckham',
      picture:
        'https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDb05bk9EAgW7oQoJCzCEnmG9tAyn4tbYQMP0iEqwjp1mRs%2FpNX%2FVwUU%2FtmNoUev76gy6QsoGjrPbAjxyAXlWbdJgNlJUwVYqIiahjW32e%2BqWA%3D%3D',
      followers: 86730162,
      is_verified: true,
    },
    {
      user_id: '26832639',
      username: 'davido',
      fullname: 'Davido',
      picture:
        'https://imgp.sptds.icu/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDZlWmgYQw8mX1KSF3S3nA7nmP1RztitBy3ZgWz657sl6mMFMYoi5WtakYItfr%2Fzha0ywnmzAdOf%2B%2FyQ5%2BI0jOWEWwq5%2BhsabX0Nc9aXCBbcsw%3D%3D',
      followers: 28780892,
      is_verified: true,
    },
  ];
}
