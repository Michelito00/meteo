import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  latitude:string = "";
  longitude:string = "";

  showDetail(){
    this.router.navigate(['/detail/' + this.latitude + '/' + this.longitude])
  }
}
