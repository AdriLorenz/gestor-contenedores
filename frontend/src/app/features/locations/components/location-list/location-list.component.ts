import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent { }
