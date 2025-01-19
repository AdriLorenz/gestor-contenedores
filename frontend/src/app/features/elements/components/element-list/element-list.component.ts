import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElementService } from '../../../../core/services/element.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditElementDialogComponent } from '../../dialogs/edit-element-dialog/edit-element-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementListComponent { 
  elements$;

  constructor(
    private elementService: ElementService,
    private dialog: MatDialog
  ) {
    this.elements$ = this.elementService.elements$;
  }

  ngOnInit(): void {
    this.elementService.getElements();
  }

  openAddEditDialog(element: any = null): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '400px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (element) {
          this.elementService.updateElement(element.id, result).subscribe();
        } else {
          this.elementService.addElement(result).subscribe();
        }
      }
    });
  }

  deleteElement(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      this.elementService.deleteElementById(id).subscribe();
    }
  }
}
