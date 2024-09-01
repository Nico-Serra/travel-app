import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Icon } from 'leaflet';

Icon.Default.imagePath = 'assets/leaflet/';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

