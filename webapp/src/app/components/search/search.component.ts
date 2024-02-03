import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent
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
import { NumberFormatPipe } from '../../number-format.pipe';
import { ProfileService } from '../../profile.service';

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
  private profileService = inject(ProfileService)
  private isUserSelection = false;

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
        return this.profileService.findUsers(val);
      }
    }),
  );

  onSelected(ev: MatAutocompleteSelectedEvent) {
    this.isUserSelection = true;
    this.profileService.selectedUser = ev.option.value
  }

  displayFn(user: UserEntity): string {
    return user && user.username ? user.username : '';
  }
}
