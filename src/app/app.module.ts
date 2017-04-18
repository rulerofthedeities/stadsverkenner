import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {CarouselModule} from 'ng2-bootstrap/carousel';
import {TooltipModule} from 'ng2-tooltip';

import {routes} from './app.routes';

import {CityService} from './services/city.service';
import {ItemService} from './services/item.service';
import {MapService} from './services/map.service';
import {HeaderService} from './services/header.service';
import {ErrorService} from './services/error.service';
import {GlobalService} from './services/global.service';

import {AppComponent} from './components/app.component';
import {MainMenuComponent, CityMenuComponent, ItemMenuComponent} from './components/menu.component';
import {HeaderComponent} from './components/header.component';
import {FooterComponent} from './components/footer.component';
import {CitiesComponent} from './components/pages/cities.component';
import {CityComponent} from './components/pages/city.component';
import {CityIntroComponent} from './components/pages/city-intro.component';
import {CityAttractionsComponent} from './components/pages/city-attractions.component';
import {CityMapComponent} from './components/pages/city-map.component';
import {ItemComponent} from './components/pages/item.component';
import {ItemInfoComponent} from './components/pages/item-info.component';
import {ItemLocationComponent} from './components/pages/item-location.component';
import {ItemPhotosComponent} from './components/pages/item-photos.component';
import {HomeComponent} from './components/pages/home.component';
import {PageNotFoundComponent} from './components/pages/page-not-found.component';
import {PictureModalComponent} from './components/modals/picture-modal.component';
import {MapComponent} from './components/map/map.component';
import {MapMarkersComponent} from './components/map/map-markers.component';
import {ErrorMessageComponent} from './components/msg/error-message.component';

import {SanitizeHtmlPipe} from './pipes/sanatize-html.pipe';
import {FormatPopulationPipe} from './pipes/format-population.pipe';
import {APPCONFIG} from './app.config';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: APPCONFIG.mapApi
    }),
    CarouselModule.forRoot(),
    TooltipModule
  ],
  providers: [
    ErrorService,
    HeaderService,
    CityService,
    ItemService,
    MapService,
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
    ItemComponent,
    ItemInfoComponent,
    ItemLocationComponent,
    ItemPhotosComponent,
    MainMenuComponent,
    CityMenuComponent,
    ItemMenuComponent,
    PageNotFoundComponent,
    PictureModalComponent,
    MapComponent,
    MapMarkersComponent,
    ErrorMessageComponent,
    SanitizeHtmlPipe,
    FormatPopulationPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
