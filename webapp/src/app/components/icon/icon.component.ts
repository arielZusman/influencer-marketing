import { Component, Input } from '@angular/core';

export type IconType = 'facebook' | 'instagram' | 'tiktok' | 'twitter' | 'youtube' | 'email'

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input() icon!: IconType
}
