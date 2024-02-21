import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Output, QueryList
} from '@angular/core';
import {TabComponent} from './tab/tab.component';
@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit {
    @Output() closeTabAction: EventEmitter<any> = new EventEmitter();
    currentTab!: TabComponent

    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;


    ngAfterContentInit() {
        this.tabs.changes.subscribe(value => {
            setTimeout(() => {
                this.selectTab(value.first);
            })
        })
        if (this.tabs.first) {
            this.selectTab(this.tabs.first)
        }
    }

    selectTab(tab: TabComponent) {
        if (this.tabs) {
            this.tabs.toArray().forEach(tab => (tab.active = false));
            tab.active = true;
        }
    }

    closeTab($event) {
        this.closeTabAction.emit($event)
    }
}
