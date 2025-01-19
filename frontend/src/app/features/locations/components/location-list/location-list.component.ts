import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocationService } from '../../../../core/services/location.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditLocationDialogComponent } from '../../dialogs/edit-location-dialog/edit-location-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent { 
  locations$: Observable<any> | undefined;

  constructor(
    private locationService: LocationService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Ahora inicializamos locations$ dentro de ngOnInit()
    this.locations$ = this.locationService.locations$;
    this.locationService.getLocations();
  }

  openAddEditDialog(location: any = null): void {
    const dialogRef = this.dialog.open(EditLocationDialogComponent, {
      width: '400px',
      data: location,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (location) {
          // Editar ubicación existente
          this.locationService.updateLocation(location.id, result).subscribe({
            next: () => {
              console.log('Ubicación actualizada con éxito');
              this.locationService.getLocations();  // Actualizamos las ubicaciones
            },
            error: (error) => {
              console.error('Error al actualizar la ubicación:', error);
            }
          });
        } else {
          // Agregar nueva ubicación
          this.locationService.addLocation(result).subscribe({
            next: () => {
              console.log('Ubicación agregada con éxito');
              this.locationService.getLocations(); // Actualizamos las ubicaciones
            },
            error: (error) => {
              console.error('Error al agregar la ubicación:', error);
            }
          });
        }
      }
    });
  }

  deleteLocation(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta ubicación?')) {
      this.locationService.deleteLocationById(id).subscribe({
        next: () => {
          console.log('Ubicación eliminada con éxito');
          this.locationService.getLocations(); // Actualizamos las ubicaciones
        },
        error: (error) => {
          console.error('Error al eliminar la ubicación:', error);
        }
      });
    }
  }

}
