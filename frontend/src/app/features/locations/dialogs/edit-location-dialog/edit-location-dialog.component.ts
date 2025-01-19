import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../../../core/services/location.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-location-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edit-location-dialog.component.html',
  styleUrl: './edit-location-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLocationDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationService: LocationService
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      lat: [data?.lat || '', Validators.required],
      lng: [data?.lng || '', Validators.required],
    });
  }

  save(): void {
    if (this.form.valid) {
      const location = this.form.value;
      if (this.data) {
        // Si ya existe la ubicación, actualizarla
        this.locationService.updateLocation(this.data.id, location).subscribe({
          next: () => {
            console.log('Ubicación actualizada');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error al actualizar la ubicación:', error);
          },
        });
      } else {
        // Si es una nueva ubicación, agregarla
        this.locationService.addLocation(location).subscribe({
          next: () => {
            console.log('Ubicación agregada');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error al agregar la ubicación:', error);
          },
        });
      }
    }
  }
}
