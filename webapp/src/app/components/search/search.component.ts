import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteActivatedEvent,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserEntity } from '@influencer-marketing/shared';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { ApiService } from '../../api.service';
import { NumberFormatPipe } from '../../number-format.pipe';
import { Router } from '@angular/router';

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
  apiService = inject(ApiService);
  router = inject(Router);

  userCtrl = new FormControl();
  filteredUsers: Observable<UserEntity[]> = this.userCtrl.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((val) => {
      return this.apiService.findUsers(val);
    }),
  );

  onSelected(ev: MatAutocompleteSelectedEvent) {
    this.router.navigate([], {
      queryParams: {
        user: ev.option.value,
      },
    });
  }
}
