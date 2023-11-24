/**
 * Ce code est un composant Angular qui affiche une carte utilisant la bibliothèque Leaflet.
 * Il utilise le service MarkerService pour ajouter des marqueurs sur la carte.
 * La carte est initialisée dans la méthode initMap() en définissant le centre et le zoom.
 * Ensuite, une couche de tuiles OpenStreetMap est ajoutée à la carte.
 * Le composant implémente l'interface AfterViewInit pour s'assurer que la carte est initialisée avant d'ajouter les marqueurs.
 */
// TODO add comments
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../marker.service';
import {Observable} from 'rxjs';
import {Schooldetails} from "../schooldetails";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.sass',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent implements OnInit {
  schoolData$: Observable<Schooldetails[]>;
  private map!: L.Map;
  private readonly mapInitializationParams: { latitude: number, longitude: number, zoom: number, tileLayerURL: string } = {
    latitude: 46.1568,
    longitude: -1.1708,
    zoom: 14,
    tileLayerURL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  constructor(private markerService: MarkerService) {
    this.schoolData$ = this.markerService.fetchSchoolData();
    this.setLeafletIcon();
  }

  ngOnInit() : void {
    this.initializeMap();
    this.populateMarkersOnMap();
  }

  private populateMarkersOnMap():void {
    this.schoolData$.subscribe({
      next: (data : Schooldetails[]): void => {
        this.markerService.addMarkers(data, this.map);
      },
      error: (error) => console.error(error),
      complete: (): void => {}
    });
  }

  private setLeafletIcon(): void {
    const iconRetinaUrl: string = '/assets/map-marker.png';
    const iconUrl: string = '/assets/map-marker.png';
    const shadowUrl: string = 'assets/marker-shadow.png';
    const iconSize: [number, number] = [41, 41];
    const iconAnchor: [number, number] = [12, 41];
    const popupAnchor: [number, number] = [1, -34];
    const tooltipAnchor: [number, number] = [16, -28];
    const shadowSize: [number, number] = [41, 41];

    L.Marker.prototype.options.icon = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize,
      iconAnchor,
      popupAnchor,
      tooltipAnchor,
      shadowSize
    });
  }

  private initializeMap(): void {
    this.createAndConfigureLeafletMap();
    this.addTileLayerToMap();
  }

  private createAndConfigureLeafletMap(): void {
    this.map = L.map('map', {
      center: [this.mapInitializationParams.latitude, this.mapInitializationParams.longitude],
      zoom: this.mapInitializationParams.zoom
    });
  }

  private addTileLayerToMap(): void {
    L.tileLayer(this.mapInitializationParams.tileLayerURL, {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }
}
