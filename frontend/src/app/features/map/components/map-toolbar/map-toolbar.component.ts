import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-map-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './map-toolbar.component.html',
  styleUrl: './map-toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapToolbarComponent { }
