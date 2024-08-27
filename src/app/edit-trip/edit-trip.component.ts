import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { log } from 'console';
import { GeocodingService } from '../geocoding.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css',
  providers: [GeocodingService]
})
export class EditTripComponent {
  @Input() index!: number;
  @Input() travel!: { place: string, date: string, description: string, image: string, indexOfMounth: number, coordinates: [number, number] };
  @Output() editClicked = new EventEmitter<void>();

  travels = JSON.parse(localStorage.getItem("travels") || "[]");

  place = '';
  image = '';
  description = '';

  coordinates: [number, number] | null = null;

  constructor(private geocodingService: GeocodingService) { }

  geocode() {
    this.geocodingService.geocodeAddress(this.place).subscribe(
      coords => {
        this.coordinates = coords;
        console.log(this.coordinates);

      },
      error => {
        console.error('Errore di geocodifica:', error);
      }
    );
  }

  updateData() {
    this.place = this.travel.place;
    this.image = this.travel.image;
    this.description = this.travel.description;
  }

  updateTrip() {
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");

    this.geocodingService.geocodeAddress(this.place).subscribe(
      coords => {

        this.coordinates = coords;
        //console.log('funziona', this.coordinates);
        for (let i = 0; i < this.travels.length; i++) {
          const element = this.travels[i];
          if (this.travel.indexOfMounth === element.indexOfMounth) {
            //console.log(element);
            element.place = this.place;
            element.image = this.image;
            element.description = this.description;
            element.coordinates = this.coordinates;
          }
        }

        localStorage.setItem(`travels`, JSON.stringify(this.travels));
        this.editClicked.emit();


      },
      error => {
        console.error('Errore di geocodifica:', error);
      }
    );




  }

}
