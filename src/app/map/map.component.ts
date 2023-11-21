/**
 * Ce code est un composant Angular qui affiche une carte utilisant la bibliothèque Leaflet.
 * Il utilise le service MarkerService pour ajouter des marqueurs sur la carte.
 * La carte est initialisée dans la méthode initMap() en définissant le centre et le zoom.
 * Ensuite, une couche de tuiles OpenStreetMap est ajoutée à la carte.
 * Le composant implémente l'interface AfterViewInit pour s'assurer que la carte est initialisée avant d'ajouter les marqueurs.
 */
import {Component, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../marker.service';
import {DomSanitizer} from "@angular/platform-browser";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.sass',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private markerService: MarkerService, private sanitizer: DomSanitizer) {
  }

  private initMap(): void {
    let x: number = 46.1568;
    let y: number = -1.1708;
    let z: number = 14;

    this.map = L.map('map', {
      center: [x, y],
      zoom: z
    });

    const tiles :L.TileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
  }
}
