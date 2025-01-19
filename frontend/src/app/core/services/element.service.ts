import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private elementsSubject = new BehaviorSubject<any[]>([]);
  elements$ = this.elementsSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/elements';

  constructor(private http: HttpClient) {}

  getElements(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      tap((elements) => this.elementsSubject.next(elements))
    ).subscribe();
  }

  addElement(element: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, element).pipe(
      tap(() => this.getElements())
    );
  }

  updateElement(id: number, updatedElement: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, updatedElement).pipe(
      tap(() => this.getElements())
    );
  }

  deleteElementById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getElements())
    );
  }
}
