import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  locationTimes(latitude: string, longitude: string) {
    return this.httpClient.get('https://api.sunrisesunset.io/json?lat='+ latitude +'&lng='+ longitude +'&timezone=UTC&date=today');
  }

  locationDetail(latitude: string, longitude: string) {
    return this.httpClient.get('https://www.7timer.info/bin/astro.php?lon='+ longitude +'&lat='+ latitude +'&ac=0&unit=metric&output=json&tzshift=0');
  }

}
