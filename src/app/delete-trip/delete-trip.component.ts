import { Component, Input, Output, EventEmitter, input } from '@angular/core';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})
export class DeleteTripComponent {
  @Input() index!:number;
  @Input() travel!: { place:string, date: string, description: string, image: string, indexOfMounth: number};
  @Output() deleteClicked = new EventEmitter<void>();

  travels: Array<{ place: string, date: string, description: string, image: string, indexOfMounth: number }> = [];

  ngOnInit(){
    //console.log(this.travel);
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    
  }

  deleteTrip(){
    for (let i = 0; i < this.travels.length; i++) {
      const element = this.travels[i];
      if (this.travel.indexOfMounth === element.indexOfMounth) {
        this.travels.splice(i,1)
      }
      //console.log(this.travels);           
    }
    localStorage.setItem(`travels`, JSON.stringify(this.travels))
    this.deleteClicked.emit()
  }


}
