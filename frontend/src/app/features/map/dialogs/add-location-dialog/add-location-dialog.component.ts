import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-location-dialog',
  standalone: true,
  imports: [],
  templateUrl: './add-location-dialog.component.html',
  styleUrl: './add-location-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLocationDialogComponent { }
