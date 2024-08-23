import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { log } from 'console';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
  @Input() data!: number;
  @Input() mounth!: string;
  @Input() updateTravels!: boolean;
  @Output() buttonClicked = new EventEmitter<void>();


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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updateTravels']) {
      //console.log('funziona');
      this.uploadTrip()
      this.updateTravels = false
      this.visible = false

      for (let i = 0; i < this.travels.length; i++) {
        const element = this.travels[i];
        //console.log(element);
        if (this.data === element.indexOfMounth) {
          this.visible = true
        }

      }



      //console.log(this.travels.length === 0);

      if (this.travels.length === 0) {
        this.visible = false
        this.updateTravels = false
      }

    }
  }

  uploadTrip() {
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    //console.log(this.travels);

  }

  saveTrip() {

    this.travels.push({
      place: this.place,
      description: this.description,
      image: this.image,
      date: this.data + ' ' + this.mounth,
      indexOfMounth: this.data,
      visible: this.visible,
    })

    //console.log(this.travels);

    localStorage.setItem(`travels`, JSON.stringify(this.travels))
    this.buttonClicked.emit();



    this.place = '';
    this.description = '';
    this.image = '';
    this.visible = true

  }







}
