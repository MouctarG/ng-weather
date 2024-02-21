import { Component } from '@angular/core';
import {LocationService} from "../services/location.service";
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  constructor(private service : LocationService) { }

  addLocation(zipcode : string){
    if (zipcode.trim().length > 0){
      this.service.addLocation(zipcode);
    }
  }

}
