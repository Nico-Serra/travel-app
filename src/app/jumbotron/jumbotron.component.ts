import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.css'
})
export class JumbotronComponent {
  @Input() title!:string
  @Input() subTitle!:string



  
}
