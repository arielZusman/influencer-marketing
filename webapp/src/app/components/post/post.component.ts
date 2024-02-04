import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemResponse } from '@influencer-marketing/shared';
import { NumberFormatPipe } from "../../number-format.pipe";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NumberFormatPipe, MatIconModule]
})
export class PostComponent {
  @Input() post!: ItemResponse;
}
