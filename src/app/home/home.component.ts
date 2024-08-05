import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ModalComponent, JumbotronComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private localStorageService: LocalStorageService) { }

  formInit = true;
  mounth = "June";
  travels: Array<{ place: string, date: string, description: string, image: string }> = [];


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
    //console.log(this.travels[0]);

  }

  eventHandler(event) {
    this.travels = JSON.parse(localStorage.getItem("travels") || "[]");
  }
}
