import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { log } from 'console';


@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent {
  @Input() index!: number;
  @Input() travel!: { place: string, date: string, description: string, image: string, indexOfMounth: number };
  @Output() editClicked = new EventEmitter<void>();

  travels = JSON.parse(localStorage.getItem("travels") || "[]");

  place = '';
  image = '';
  description = '';

  updateData() {
    this.place = this.travel.place;
    this.image = this.travel.image;
    this.description = this.travel.description;
  }

  updateTrip() {

    for (let i = 0; i < this.travels.length; i++) {
      const element = this.travels[i];
      if (this.travel.indexOfMounth === element.indexOfMounth) {
        //console.log(element);
        element.place = this.place;
        element.image = this.image;
        element.description = this.description;
      }
    }

    localStorage.setItem(`travels`, JSON.stringify(this.travels));
    this.editClicked.emit();


  }

}
