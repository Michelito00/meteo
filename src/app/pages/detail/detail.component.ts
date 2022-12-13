import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/_service/api.service';
import { MeteoDetail, TimeDetail } from 'src/app/_models/meteo-detail.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  latitude:string = '';
  longitude:string = '';
  time!: TimeDetail;
  meteo!: MeteoDetail[];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.latitude = params['lat'];
      this.longitude = params['lon'];

      this.apiService
        .locationTimes(this.latitude, this.longitude)
        .subscribe((response: any) => {
          console.log(response);
          this.time = response;
        });

      this.apiService
        .locationDetail(this.latitude, this.longitude)
        .subscribe((response: any) => {
          console.log(response.dataseries);
          this.meteo = response.dataseries;

          for (const status of this.meteo) {
            if (status.timepoint > 24 && status.timepoint <= 48) {
              status.timepoint -= 24;
            } else if (status.timepoint > 48) {
              status.timepoint -= 48;
            }

            switch (status.cloudcover.toString()) {
              case '1':
                status.cloudcover = '0%-6%';
                break;
              case '2':
                status.cloudcover = '6%-19%';
                break;
              case '3':
                status.cloudcover = '19%-31%';
                break;
              case '4':
                status.cloudcover = '31%-44%';
                break;
              case '5':
                status.cloudcover = '44%-56%';
                break;
              case '6':
                status.cloudcover = '56%-69%';
                break;
              case '7':
                status.cloudcover = '69%-81%';
                break;
              case '8':
                status.cloudcover = '81%-94%';
                break;
              case '9':
                status.cloudcover = '94%-100%';
                break;
              default:
                break;
            }

            if (status.cloudcover <= '2') {
              status.icon = 'https://www.7timer.info/img/misc/about_two_clear.png';
            }

            if (status.cloudcover <= '8') {
              status.icon = 'https://www.7timer.info/img/misc/about_two_pcloudy.png';
            }

            if (status.cloudcover >= '8') {
              status.icon = 'https://www.7timer.info/img/misc/about_two_cloudy.png';
            }

            if (status.prec_type == 'rain') {
              status.icon = 'https://www.7timer.info/img/misc/about_two_rain.png';
            }

            if (status.prec_type == 'snow') {
              status.icon = 'https://www.7timer.info/img/misc/about_two_snow.png';
            }
          }
        });
    });
  }

}
