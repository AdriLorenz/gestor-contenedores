import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationsSubject = new BehaviorSubject<any[]>([]);
  locations$ = this.locationsSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/locations';

  constructor(private http: HttpClient) {}

  getLocations(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      tap((locations) => this.locationsSubject.next(locations))
    ).subscribe();
  }

  addLocation(location: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, location).pipe(
      tap(() => this.getLocations())
    );
  }

  updateLocation(id: number, updatedLocation: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, updatedLocation).pipe(
      tap(() => this.getLocations())
    );
  }

  deleteLocationById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getLocations())
    );
  }
}
