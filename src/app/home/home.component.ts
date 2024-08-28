import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { DeleteTripComponent } from '../delete-trip/delete-trip.component';
import { EditTripComponent } from '../edit-trip/edit-trip.component';
import { MapComponent } from '../map/map.component';
import { Router, RouterModule } from '@angular/router';
import { SingleTripComponent } from '../single-trip/single-trip.component';







@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ModalComponent, JumbotronComponent, DeleteTripComponent, EditTripComponent, MapComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent {
  constructor(private localStorageService: LocalStorageService,  private router: Router,) { }

  formInit = true;
  mounth = "June";
  travels: Array<{id:number, place: string, date: string, description: string, image: string, indexOfMounth: number, coordinates: [number,number] }> = [];
  clickDelete = false;

  onTravelClick(travelId: number | string) {
    this.router.navigate(['/travel', travelId]);
  }



  saveMount() {
    //console.log(this.mounth);
    localStorage.setItem('mounth', this.mounth)
    this.formInit = false;
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('mounth')) {
        this.formInit = false;
        this.mounth = localStorage.getItem('mounth')!;
      }
  
      this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
      this.travels.sort((a, b) => a.indexOfMounth - b.indexOfMounth);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  onButtonClick(index: number) {
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    this.travels.sort((a, b) => a.indexOfMounth - b.indexOfMounth);
  }

  onDeleteClick() {
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    this.travels.sort((a, b) => a.indexOfMounth - b.indexOfMounth);
    this.clickDelete = !this.clickDelete;



  }

  onEditClick() {
    //console.log('ciao');
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    //console.log(this.travels);
    this.travels.sort((a, b) => a.indexOfMounth - b.indexOfMounth);

  }


}
