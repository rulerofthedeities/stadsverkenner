import {Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home.component';
import {CitiesComponent} from './components/pages/cities.component';
import {CityComponent} from './components/pages/city.component';
import {CityIntroComponent} from './components/pages/city-intro.component';
import {CityAttractionsComponent} from './components/pages/city-attractions.component';
import {CityMapComponent} from './components/pages/city-map.component';
import {CityItemComponent} from './components/pages/city-item.component';
import {PageNotFoundComponent} from './components/pages/page-not-found.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'steden', component: CitiesComponent},
  {
    path: ':city',
    component: CityComponent,
    children: [
      {path: '', component: CityIntroComponent},
      {path: 'attracties', component: CityAttractionsComponent},
      {path: 'attracties/:item', component: CityItemComponent},
      {path: 'kaart', component: CityMapComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];
