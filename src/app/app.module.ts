import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './zipcode-entry/zipcode-entry.component';
import {LocationService} from './services/location.service';
import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {WeatherService} from './services/weather.service';
import {CurrentConditionsComponent} from './current-conditions/current-conditions.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LocalStorageService} from './services/localStorage.service';
import {TabComponent} from './tabs/tab/tab.component';
import {TabsComponent} from './tabs/tabs.component';
import {CacheService} from './cache-handler/cache.service';

@NgModule({
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        MainPageComponent,
        TabComponent,
        TabsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
    ],
    providers: [LocationService, WeatherService, LocalStorageService, CacheService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
