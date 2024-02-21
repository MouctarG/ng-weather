import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from './localStorage.service';
import {LocationOperationInterface} from '../models/location-operation.interface';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
    private locationsSubject = new BehaviorSubject<string []>(this.fetchLocations());
    private locationSubject = new BehaviorSubject<LocationOperationInterface>(null);
    private locations: string[] = [];
    public locations$ = this.locationsSubject.asObservable()
    public locationAddOrRemoveOperation$ = this.locationSubject.asObservable()


    constructor(private localStorageService: LocalStorageService) {
        this.locations = this.fetchLocations();
    }

    addLocation(zipcode: string) {
        if (!this.locationExist(zipcode)) {
            this.locationSubject.next({zipcode, operation: 'add'})
        }
    }

    removeLocation(zipcode: string) {
        let index = this.locations.indexOf(zipcode);
        if (index !== -1) {
            this.locations.splice(index, 1);
            this.localStorageService.saveLocations(this.locations)
            this.locationSubject.next({zipcode, operation: 'remove'})
        }
    }

    fetchLocations() {
        let locString = this.localStorageService.getLocations();
        if (locString) {
            this.locations = JSON.parse(locString);
            return this.locations;
        }
        return []
    }

    saveLocationInLocalStorage(zipcode: string) {
        this.locations.push(zipcode);
        this.localStorageService.saveLocations(this.locations)
    }

    locationExist(zipcode: string): boolean {
        return this.locations.includes(zipcode)
    }
}
