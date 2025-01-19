import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationListComponent } from './app/features/locations/components/location-list/location-list.component';
import { ElementListComponent } from './app/features/elements/components/element-list/element-list.component';
import { MapComponent } from './app/features/map/components/map/map.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'locations', component: LocationListComponent },
  { path: 'elements', component: ElementListComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, GoogleMapsModule, MatDialogModule),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
