import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocationService } from '../../../../core/services/location.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit { 
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 };
  zoom = 8;
  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];
  geocoder = new google.maps.Geocoder();

  constructor(
    private locationService: LocationService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.locationService.locations$.subscribe((locations) => {
      // Actualizamos los marcadores con una nueva referencia
      this.markers = locations.map((location) => ({
        position: { lat: location.lat, lng: location.lng },
        title: location.name || 'Sin nombre',
      }));
      this.cdr.detectChanges();  // Forzamos la detección de cambios para que Angular actualice el DOM
    });

    // Llamar explícitamente al método para cargar ubicaciones iniciales
    this.locationService.getLocations();
  }

  addMarker(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const address = results[0].formatted_address;
          const types = results[0].types;

          const isStreet = types.includes('route') || types.includes('street_address');

          if (isStreet) {
            const name = prompt('Nombre de la ubicación:');

            if (name && name.trim() !== '') {
              this.locationService.addLocation({ name, lat, lng }).subscribe({
                next: () => {
                  console.log('Ubicación agregada correctamente');
                  this.cdr.detectChanges();  // Forzamos la detección de cambios después de agregar
                },
                error: (error) => {
                  console.error('Error al agregar la ubicación:', error);
                }
              });
            } else {
              alert('Por favor, ingrese un nombre válido para la ubicación.');
            }
          } else {
            alert('Por favor, seleccione un punto sobre una calle.');
          }
        } else {
          alert('No se pudo obtener la dirección de la ubicación.');
        }
      });
    }
  }
}
