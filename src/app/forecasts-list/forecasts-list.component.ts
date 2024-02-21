import { Component } from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';
import {CacheService} from '../cache-handler/cache.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode: string;
  forecast: Forecast;

  constructor(protected weatherService: WeatherService, route : ActivatedRoute, private cacheService: CacheService) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      const data = this.cacheService.getForecastInCache(this.zipcode);
      if (data) {
        this.forecast =  JSON.parse(data)
      }
      else {
        weatherService.getForecast(this.zipcode)
            .subscribe(data => {
              this.forecast = data
              this.cacheService.setForecastInCache(this.zipcode,this.forecast)
            });
      }

    });
  }
}
