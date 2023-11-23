import {Routes} from "@angular/router";
import {MapComponent} from "./map/map.component";
import {FormComponent} from "./form/form.component"

const routeConfig: Routes = [
  {
    path: '',
    component: MapComponent,
    title: 'School Finder'
  },
  {
    path: 'form/:id',
    component: FormComponent,
    title: 'Détails Écoles'
  }
];
export default routeConfig;
