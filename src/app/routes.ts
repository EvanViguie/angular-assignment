import {Routes} from "@angular/router";
import {MapComponent} from "./map/map.component";
import {DetailsComponent} from "./details/details.component"

const routeConfig: Routes = [
  {
    path: '',
    component: MapComponent,
    title: 'School Finder'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Détails Écoles'
  }
];
export default routeConfig;
