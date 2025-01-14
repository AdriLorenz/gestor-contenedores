import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delete-element-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-element-dialog.component.html',
  styleUrl: './delete-element-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteElementDialogComponent { }
