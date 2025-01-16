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

const routes: Routes = [
  { path: '', redirectTo: '/locations', pathMatch: 'full' },
  { path: 'locations', component: LocationListComponent },
  { path: 'elements', component: ElementListComponent },
  { path: 'map', component: MapComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, GoogleMapsModule),
  ],
}).catch((err) => console.error(err));
