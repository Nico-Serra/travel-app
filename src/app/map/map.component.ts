import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() travels: any[] = [];
  private map: any;
  private L: any;
  private markers: any[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit() {
    if (this.isBrowser) {
      this.L = await import('leaflet');
      await this.initMap();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['travels'] && this.map) {
      this.updateMarkers();
    }
  }

  private async initMap(): Promise<void> {
    this.map = this.L.map('map').setView([41.9028, 12.4964], 6);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    await this.updateMarkers();
  }

  private async updateMarkers(): Promise<void> {
    if (!this.isBrowser || !this.map) return;


    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];


    this.travels.forEach(travel => {
      if (travel.coordinates) {
        const marker = this.L.marker(travel.coordinates)
          .addTo(this.map)
          .bindPopup(travel.place);
        this.markers.push(marker);
      }
    });


    if (this.markers.length > 0) {
      const group = this.L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }
}