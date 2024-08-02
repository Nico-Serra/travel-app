import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { log } from 'console';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() data!: number;
  @Input() mounth!: string;

  visible = false

  place = '';
  description = '';
  image = '';
  travels = JSON.parse(localStorage.getItem("travels") || "[]");

  ngOnInit() {
    //console.log(this.mounth);
    for (let i = 0; i < this.travels.length; i++) {
      const element = this.travels[i];
      //console.log(element);
      if (this.data === element.indexOfMounth) {
        this.visible = true
      }

    }

  }

  saveTrip() {

    this.travels.push({
      place: this.place,
      description: this.description,
      image: this.image,
      date: this.data + ' ' + this.mounth,
      indexOfMounth: this.data
    })

    //console.log(this.travels);

    localStorage.setItem(`travels`, JSON.stringify(this.travels))

    this.place = '';
    this.description = '';
    this.image = '';
    this.visible = true

  }

}
