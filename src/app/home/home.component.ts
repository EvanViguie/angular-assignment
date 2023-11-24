/**
 * Ce fichier contient la classe HomeComponent, qui est responsable de l'affichage de la page d'accueil de l'application.
 * Il importe le module GoogleMaps et utilise le composant GoogleMaps pour afficher une carte sur la page d'accueil.
 */
import {Component} from '@angular/core';
import {MapComponent} from "../map/map.component";

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
      <app-map></app-map>
  `,
  imports: [
    MapComponent
  ]
})
export class HomeComponent {
}
