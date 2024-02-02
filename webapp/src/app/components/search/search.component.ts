import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private apiService = inject(ApiService);
  private router = inject(Router);
  private isUserSelection = false;

  @Output() userSelected = new EventEmitter<UserEntity>();

  userCtrl = new FormControl();
  filteredUsers: Observable<UserEntity[]> = this.userCtrl.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((val) => {
      if (this.isUserSelection) {
        // If the selection is from the user, don't make the API call
        this.isUserSelection = false;
        return [];
      } else {
        return this.apiService.findUsers(val);
      }
    }),
  );

  onSelected(ev: MatAutocompleteSelectedEvent) {
    this.isUserSelection = true;
    this.userSelected.emit(ev.option.value);
    this.router.navigate([], {
      queryParams: {
        user: ev.option.value.username,
      },
    });
  }

  displayFn(user: UserEntity): string {
    return user && user.username ? user.username : '';
  }
}
