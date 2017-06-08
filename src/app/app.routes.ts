import {Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home.component';
import {CitiesComponent} from './components/pages/cities.component';
import {CityComponent} from './components/pages/city.component';
import {CityIntroComponent} from './components/pages/city-intro.component';
import {CityAttractionsComponent} from './components/pages/city-attractions.component';
import {CityMapComponent} from './components/pages/city-map.component';
import {CityActivitiesComponent} from './components/pages/city-activities.component';
import {ItemComponent} from './components/pages/item.component';
import {ItemInfoComponent} from './components/pages/item-info.component';
import {ItemLocationComponent} from './components/pages/item-location.component';
import {ItemActivitiesComponent} from './components/pages/item-activities.component';
import {ItemPhotosComponent} from './components/pages/item-photos.component';
import {ItemRedirectComponent} from './components/pages/item-redirect.component';
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
      {
        path: 'attracties/:item',
        component: ItemComponent,
        children: [
          {path: '', component: ItemInfoComponent},
          {path: 'ligging', component: ItemLocationComponent},
          {path: 'activiteiten', component: ItemActivitiesComponent},
          {path: 'fotos', component: ItemPhotosComponent}
        ]
      },
      {path: 'activiteiten', component: CityActivitiesComponent},
      {path: 'kaart', component: CityMapComponent},
      {path: '**', component: ItemRedirectComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];
