import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delete-location-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-location-dialog.component.html',
  styleUrl: './delete-location-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteLocationDialogComponent { }
