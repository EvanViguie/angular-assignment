/**
 * Nous importons les modules nécessaires pour notre composant.
 * ChangeDetectionStrategy est importé pour permettre une détection des changements optimalisée pour ce composant.
 *  OnInit est une interface qui est implémentée par une classe pour
 *  définir une méthode à exécuter lorsque le composant est initialisé.
 */
// définir une méthode à exécuter lorsque le composant est initialisé.
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
// Importation de Leaflet, une bibliothèque JavaScript pour les cartes interactives.
import * as L from 'leaflet';
// importe le service MarkerService, une classe qui fournit des fonctionnalités liées aux marqueurs de la carte Leaflet.
import {MarkerService} from '../marker.service';
// Importe Observable depuis la bibliothèque rxjs. Observable est une collection qui arrive dans le temps
import {Observable} from 'rxjs';
// Importe l'interface SchoolDetails, qui décrit la structure d'un objet représente les détails d'une école.
import {Schooldetails} from "../schooldetails";


/**
 * Le décorateur Component de Angular pour déclarer un composant Angular.
 * La classe MapComponent est définie comme un composant Angular par ce décorateur.
 */
@Component({
  selector: 'app-map', // Le nom de la balise personnalisée pour ce component. e.g <app-map></app-map>
  templateUrl: './map.component.html', // chemin vers le fichier HTML pour ce component.
  styleUrl: './map.component.sass', // chemin vers le fichier de style pour ce component.
  standalone: true, // Ce component peut être utilisé indépendamment sans nécessiter d'autres directives ou components.
  changeDetection: ChangeDetectionStrategy.OnPush // Utilise la stratégie de détection de modification OnPush
  // pour améliorer les performances.
})

/**
 * La class MapComponent est définie. Ça implémente l'interface OnInit
 * pour fournir une fonction pour l'initialisation du component.
 */
export class MapComponent implements OnInit {
  schoolData$: Observable<Schooldetails[]>; // Un Observable qui émet array de SchoolDetails.
  private map!: L.Map; // Une propriété privée qui stocke l'objet Map de Leaflet.
  private readonly mapInitializationParams: {
    latitude: number,
    longitude: number,
    zoom: number,
    tileLayerURL: string
  } = {
    latitude: 46.1568,
    longitude: -1.1708,
    zoom: 14,
    tileLayerURL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  /**
   * La construction est définie avec une dépendance injectée vers le MarkerService.
   * schoolData$ est initialisé en utilisant le service markerService.
   * La méthode setLeafletIcon est appelée pour définir l'icône par défaut de Leaflet.
   */
  constructor(private markerService: MarkerService) {
    this.schoolData$ = this.markerService.fetchSchoolData();
    this.setLeafletIcon();
  }

  /**
   * La méthode ngOnInit est une méthode du cycle de vie Angular qui
   * est appelée après que Angular a initialisé les données liées des propriétés d'entrée.
   */
  ngOnInit(): void {
    this.initializeMap();
    this.populateMarkersOnMap();
  }

  /**  Cette fonction s'abonne à un flux de données qui diffusent les informations sur les écoles (par exemple, à partir d'une
   * API ou d'une autre source de données). À chaque fois qu'une nouvelle donnée arrive (c'est-à-dire à chaque 'next'), elle utilise
   * le service 'markerService' pour ajouter un marqueur pour l'école sur une carte Leaflet.
   */
  private populateMarkersOnMap(): void {
    // Nous nous abonnons à l'Observable 'schoolData$' qui diffusera les détails des écoles.
    this.schoolData$.subscribe({
      // En cas de succès, nous recevons un tableau avec les détails de chaque école (data : Schooldetails[]).
      next: (data: Schooldetails[]): void => {
        // Nous utilisons le service 'markerService' pour ajouter des marqueurs sur la carte pour chaque école.
        this.markerService.addMarkers(data, this.map);
      },
      // En cas d'erreur dans l'Observable, nous la capturons et l'affichons dans la console.
      error: (error) => console.error(error),
      // Une fois que l'Observable a terminé sa diffusion, nous ne faisons rien.
      complete: (): void => {
      }
    });
  }

  /**
   * La méthode setLeafletIcon est définie pour définir l'icône par défaut de Leaflet.
   */
  private setLeafletIcon(): void {
    const iconRetinaUrl: string = '/assets/map-marker.png'; // URL de l'icône pour les appareils retina.
    const iconUrl: string = '/assets/map-marker.png'; // URL de l'icône.
    const shadowUrl: string = 'assets/marker-shadow.png'; // URL pour l'ombre de l'icône.
    const iconSize: [number, number] = [41, 41]; // Taille de l'icône en pixels.
    const iconAnchor: [number, number] = [12, 41]; // Position de l'icône par rapport à son emplacement.
    const popupAnchor: [number, number] = [1, -34]; // Position du popup par rapport à l'icône.
    const tooltipAnchor: [number, number] = [16, -28]; // Position de l'infobulle par rapport à l'icône.
    const shadowSize: [number, number] = [41, 41]; // Taille de l'ombre de l'icône.
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

  /**
   * Initialisation de la carte Leaflet.
   * Cette méthode crée et configure la carte Leaflet et ajoute une couche de tuiles à la carte.
   */
  private initializeMap(): void {
    this.createAndConfigureLeafletMap();
    this.addTileLayerToMap();
  }

  /**
   * Création et configuration de la carte Leaflet.
   * Cette méthode crée une instance de la carte Leaflet et la configure avec un centre et un niveau de zoom.
   * Il utilise des paramètres d'initialisation de carte stockés dans "mapInitializationParams".
   */
  private createAndConfigureLeafletMap(): void {
    this.map = L.map('map', {
      center: [this.mapInitializationParams.latitude, this.mapInitializationParams.longitude],
      zoom: this.mapInitializationParams.zoom
    });
  }

  /**
   * Ajouter une couche de tuiles à la carte Leaflet.
   * Cette méthode ajoute une nouvelle couche de tuiles à la carte Leaflet en utilisant OpenStreetMap.
   * La fonction addTo(this.map) ajoute cette couche de tuiles à notre instance de carte.
   */
  private addTileLayerToMap(): void {
    L.tileLayer(this.mapInitializationParams.tileLayerURL, {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }
}
