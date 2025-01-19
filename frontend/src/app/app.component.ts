import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './features/map/components/map/map.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LocationListComponent } from './features/locations/components/location-list/location-list.component';
import { ElementListComponent } from './features/elements/components/element-list/element-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Gestor contenedores';
  private currentDialog: MatDialogRef<any> | null = null;

  constructor(private dialog: MatDialog) {}

  openLocations(): void {
    if (this.currentDialog) {
      this.currentDialog.close();
    }

    this.currentDialog = this.dialog.open(LocationListComponent, {
      width: '400px',
      maxWidth: '500px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      hasBackdrop: true,
    });

    this.currentDialog.afterClosed().subscribe(() => {
      this.currentDialog = null;
    });
  }

  openElements(): void {
    if (this.currentDialog) {
      this.currentDialog.close();
    }

    this.currentDialog = this.dialog.open(ElementListComponent, {
      width: '400px',
      maxWidth: '500px',
      height: '500px',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      hasBackdrop: true,
    });

    this.currentDialog.afterClosed().subscribe(() => {
      this.currentDialog = null;
    });
  }
}
