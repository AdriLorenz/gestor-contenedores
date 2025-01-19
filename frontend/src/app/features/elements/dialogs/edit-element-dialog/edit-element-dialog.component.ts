import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElementService } from '../../../../core/services/element.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-element-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './edit-element-dialog.component.html',
  styleUrl: './edit-element-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditElementDialogComponent { 
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private elementService: ElementService
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      lat: [data?.lat || '', Validators.required],
      lng: [data?.lng || '', Validators.required],
    });
  }

  save(): void {
    if (this.form.valid) {
      const element = this.form.value;
      if (this.data) {
        this.elementService.updateElement(this.data.id, element).subscribe();
      } else {
        this.elementService.addElement(element).subscribe();
      }
      this.dialogRef.close();
    }
  }
}
