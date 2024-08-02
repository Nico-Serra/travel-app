import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private localStorageService: LocalStorageService) { }

  formInit = true;
  mounth = "June";
  travels = [];
  

  saveMount() {
    //console.log(this.mounth);
    localStorage.setItem('mounth', this.mounth)
    this.formInit = false;
  }

  ngOnInit() {
    if (localStorage.getItem('mounth')) {
      this.formInit = false;
      this.mounth =  localStorage.getItem('mounth')!
    }

   this.travels = JSON.parse(localStorage.getItem("travels") || "[]");

    
    console.log(this.travels);
    

  }
}
