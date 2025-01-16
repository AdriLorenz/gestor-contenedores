import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Routes } from '@angular/router';
import { LocationListComponent } from './app/features/locations/components/location-list/location-list.component';
import { ElementListComponent } from './app/features/elements/components/element-list/element-list.component';
import { MapComponent } from './app/features/map/components/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: '/locations', pathMatch: 'full' },
  { path: 'locations', component: LocationListComponent },
  { path: 'elements', component: ElementListComponent },
  { path: 'map', component: MapComponent },
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
