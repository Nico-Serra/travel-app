import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { DeleteTripComponent } from '../delete-trip/delete-trip.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ModalComponent, JumbotronComponent, DeleteTripComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private localStorageService: LocalStorageService) { }

  formInit = true;
  mounth = "June";
  travels: Array<{ place: string, date: string, description: string, image: string, indexOfMounth: number }> = [];
  clickDelete = false;


  saveMount() {
    //console.log(this.mounth);
    localStorage.setItem('mounth', this.mounth)
    this.formInit = false;
  }

  ngOnInit() {
    if (localStorage.getItem('mounth')) {
      this.formInit = false;
      this.mounth = localStorage.getItem('mounth')!
    }

    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    this.travels.sort((a, b) => a.indexOfMounth - b.indexOfMounth);
    //console.log(this.travels);

  }

  onButtonClick(index: number) {
    //console.log(`Il pulsante del componente figlio è stato cliccato! ${index}`);
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    this.travels.sort((a, b) => a.indexOfMounth - b.indexOfMounth);
  }

  onDeleteClick() {
    //console.log(`Il pulsante del componente figlio è stato cliccato! ${index}`);
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
    this.travels.sort((a, b) => a.indexOfMounth - b.indexOfMounth);
    this.clickDelete = !this.clickDelete;
    
    
    
  }


}
