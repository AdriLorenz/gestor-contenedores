import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class MapComponent { 
  center: google.maps.LatLngLiteral = { lat: 40.416775, lng: -3.70379 };
  zoom = 8;
  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];
  

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    // Cargar ubicaciones iniciales y convertirlas en marcadores
    this.locationService.locations$.subscribe((locations) => {
      this.markers = locations.map((location) => ({
        position: { lat: location.lat, lng: location.lng },
        title: location.name || 'Sin nombre',
      }));
    });

    // Llamar explícitamente al método para cargar ubicaciones iniciales
    this.locationService.getLocations();
  }

  addMarker(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const name = prompt('Nombre de la ubicación:') || 'Nueva ubicación';

      this.locationService.addLocation({ name, lat, lng });
    }
  }
}
