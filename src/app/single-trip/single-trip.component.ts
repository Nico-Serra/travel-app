import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-single-trip',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.css'
})
export class SingleTripComponent {
  travels = JSON.parse(localStorage.getItem("travels") || "[]");
  travel ={ place: '', date: '', description: '', image: '', indexOfMounth: 0, coordinates: [0, 0] };

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const place = this.route.snapshot.paramMap.get('place');
    
    for (let i = 0; i < this.travels.length; i++) {
      const element = this.travels[i];
      if (element.place === place) {
        this.travel = element
        break
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

}
