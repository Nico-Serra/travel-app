import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  private map: any;
  travels = JSON.parse(localStorage.getItem("travels") || "[]");

  async ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const L = await import('leaflet');
      this.initMap(L);
    }
  }

  private initMap(L: any): void {
    this.map = L.map('map').setView([41.9028, 12.4964], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);


    this.travels.forEach((travel: { coordinates: [number, number]; place: string }) => {
      L.marker(travel.coordinates).addTo(this.map).bindPopup(travel.place);
    });

    
  }
}