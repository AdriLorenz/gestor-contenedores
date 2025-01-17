import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationsSubject = new BehaviorSubject<any[]>([]);
  locations$ = this.locationsSubject.asObservable();

  getLocations(): void {
    const mockLocations = [
      { id: 1, name: 'Ubicación 1', lat: 40.416775, lng: -3.70379 },
      { id: 2, name: 'Ubicación 2', lat: 41.3879, lng: 2.16992 },
    ];
    this.locationsSubject.next(mockLocations);
  }

  addLocation(location: any): void {
    const currentLocations = this.locationsSubject.getValue();
    const newLocation = { id: Date.now(), ...location };
    this.locationsSubject.next([...currentLocations, newLocation]);
  }

  updateLocations(id: number, updatedLocation: any): void {
    const currentLocations = this.locationsSubject.getValue();
    const updatedLocations = currentLocations.map((loc) =>
      loc.id === id ? { ...loc, ...updatedLocation } : loc
    );
    this.locationsSubject.next(updatedLocations);
  }

  deleteLocationById(id: number): void {
    const currentLocations = this.locationsSubject.getValue();
    const updatedLocations = currentLocations.filter((loc) => loc.id !== id);
    this.locationsSubject.next(updatedLocations);
  }
}
