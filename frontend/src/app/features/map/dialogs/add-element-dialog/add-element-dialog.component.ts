import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-element-dialog',
  standalone: true,
  imports: [],
  templateUrl: './add-element-dialog.component.html',
  styleUrl: './add-element-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddElementDialogComponent { }
