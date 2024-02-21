import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.css'
})
export class TabComponent {
    @Input() title: string = '';
    @Input() id!: string;
    active = false;
}
