import { Injectable } from '@angular/core';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocalStorageService {

  saveLocations(locations: string []){
    localStorage.setItem(LOCATIONS, JSON.stringify(locations));
  }

  getLocations(){
    return  localStorage.getItem(LOCATIONS);
  }
}
