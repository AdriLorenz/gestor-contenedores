import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocationService } from '../../../../core/services/location.service';
import { MatDialog } from '@angular/material/dialog';
import { EditLocationDialogComponent } from '../../dialogs/edit-location-dialog/edit-location-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent { 
  locations$

  constructor(
    private locationService: LocationService, 
    private dialog: MatDialog
  ) {
    this.locations$ = this.locationService.locations$;
  }

  ngOnInit(): void {
    this.locationService.getLocations();
  }

  openAddEditDialog(location: any = null): void {
    const dialogRef = this.dialog.open(EditLocationDialogComponent, {
      width: '400px',
      height: '300px',
      data: location,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Ubicación actualizada:', result);
      }
    });
  }

  deleteLocation(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta ubicación?')) {
      this.locationService.deleteLocationById(id);
    }
  }
}
