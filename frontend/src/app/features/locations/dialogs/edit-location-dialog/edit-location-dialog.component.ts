import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-location-dialog',
  standalone: true,
  imports: [],
  templateUrl: './edit-location-dialog.component.html',
  styleUrl: './edit-location-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLocationDialogComponent { }
