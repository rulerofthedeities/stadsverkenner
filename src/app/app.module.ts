import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {routes} from './routes';

import {CityService} from './services/city.service';
import {ItemService} from './services/item.service';
import {HeaderService} from './services/header.service';
import {ErrorService} from './services/error.service';
import {GlobalService} from './services/global.service';

import {AppComponent} from './components/app.component';
import {MainMenuComponent, SubMenuComponent} from './components/menu.component';
import {HeaderComponent} from './components/header.component';
import {FooterComponent} from './components/footer.component';
import {CitiesComponent} from './components/pages/cities.component';
import {CityComponent} from './components/pages/city.component';
import {CityIntroComponent} from './components/pages/city-intro.component';
import {CityAttractionsComponent} from './components/pages/city-attractions.component';
import {CityMapComponent} from './components/pages/city-map.component';
import {CityItemComponent} from './components/pages/city-item.component';
import {HomeComponent} from './components/pages/home.component';
import {PageNotFoundComponent} from './components/pages/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ErrorService,
    HeaderService,
    CityService,
    ItemService,
    GlobalService,
    Title
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CitiesComponent,
    CityComponent,
    CityIntroComponent,
    CityAttractionsComponent,
    CityMapComponent,
    CityItemComponent,
    MainMenuComponent,
    SubMenuComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }