import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemResponse } from '@influencer-marketing/shared';
import { NumberFormatPipe } from "../../number-format.pipe";

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NumberFormatPipe]
})
export class PostComponent {
  @Input() post!: ItemResponse;
}
