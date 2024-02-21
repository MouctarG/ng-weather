import {Injectable} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {BehaviorSubject} from 'rxjs';
import {EXPIRATION_TIME_IN_MINUTES} from './config/cache.config';
import {CacheModel} from './cache.model';
import {Forecast} from '../forecasts-list/forecast.type';

@Injectable()
export class CacheService {

    setForecastInCache(key: string, forecast: Forecast) {
        const data: CacheModel = {
            key: key, value:
                JSON.stringify(forecast),
            expirationDate: this.getExpirationDate()
        }
        localStorage.setItem(data.key, JSON.stringify(data))
    }

    getForecastInCache(key: string) {
        const dataString = localStorage.getItem(key);
        if (!dataString) {
            return null;
        }
        const data: CacheModel = JSON.parse(dataString);

        if (this.isExpired(new Date(data.expirationDate))) {
            localStorage.removeItem(key)
            return null;
        }
        return data.value
    }

    isExpired(expirationDate: Date): boolean {
        const currentDate = new Date();
        return currentDate.getTime() > expirationDate.getTime()
    };

    getExpirationDate(): Date {
        return new Date(new Date().getTime() + (EXPIRATION_TIME_IN_MINUTES * 60 * 1000));
    }

}
