import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-element-dialog',
  standalone: true,
  imports: [],
  templateUrl: './edit-element-dialog.component.html',
  styleUrl: './edit-element-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditElementDialogComponent { }
