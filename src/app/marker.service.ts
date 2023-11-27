/**
 * Ce fichier contient le code source pour le service Marker (Marqueur).
 * Il est utilisé pour récupérer les données des écoles à partir d'une API et pour créer des
 * marqueurs pour chaque école sur une carte.
 */
// Le décorateur Injectable fournit les métadonnées qui permettent à d'autres classes d'injecter
// ce service en dépendance.
import {Injectable} from '@angular/core';
// HttpClient est une interface Angular pour faire des requêtes HTTP
import {HttpClient} from '@angular/common/http';
// Importe le service Popup pour créer des popups sur les marqueurs
import {PopupService} from './popup.service';
// Importe l'interface Schooldetails qui décrit la structure des données des écoles
import {Schooldetails} from "./schooldetails";
// Importe Observable depuis la bibliothèque rxjs. Observable est une collection qui arrive dans le temps
import {Observable} from 'rxjs';
// Importe la bibliothèque Leaflet pour la manipulation de cartes interactives
import * as L from 'leaflet';
// Importe le Router pour permettre la navigation entre routes
import {Router} from "@angular/router";
// Importe les méthodes take et map de l'extension RxJS (Reactive Extensions JavaScript)
// pour manipuler les valeurs émises par un Observable
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  // Définition des constantes utilisées pour la construction de l'URL de l'API
  private readonly BASE_URL: string = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/' +
    'datasets/fr-en-annuaire-education/records';
  private readonly SELECT: string = '*';
  private readonly WHERE: string = 'nom_commune%3D%20%20%22La%20Rochelle%22%20';
  private readonly LIMIT: string = '100';
  private readonly REFINES: string[] = [
    'type_etablissement%3A%22Ecole%22',
    'type_etablissement%3A%22Coll%C3%A8ge%22',
    'type_etablissement%3A%22Lyc%C3%A9e%22'
  ];

  // Constructeur de la classe : injection de HttpClient, PopupService et Router en tant que dépendances
  constructor(
    // Injection des dépendances
    private http: HttpClient,
    private popupService: PopupService,
    private router: Router
  ) {
  }

  // Construction de l'URL de l'API
  private getSchoolsApiUrl(): string {
    return `${this.BASE_URL}?select=${this.SELECT}&where=${this.WHERE}
    &limit=${this.LIMIT}&refine=${this.REFINES.join('&refine=')}`;
  }

  // Récupère les données des écoles depuis l'API
  fetchSchoolData(): Observable<Schooldetails[]> {
    // On utilise le client HTTP pour envoyer une requête GET à l'URL API qui retourne les données de l'école
    return this.http.get<{ results: Schooldetails[] }>(this.getSchoolsApiUrl())
      .pipe(
        // On utilise l'opérateur de transformation de map pour récupérer
        // seulement les résultats des données renvoyées par l'API
        map(response => response.results),
        // Ensuite, on utilise l'opérateur take pour compléter l'Observable après avoir émis une valeur,
        // afin d'éviter d'avoir à se désinscrire
        take(1)
      );
  }

  // Ajoute des marqueurs pour chaque école sur une carte
  addMarkers(schoolData: Schooldetails[], map: L.Map): Schooldetails[] {
    schoolData.forEach(school => this.createMarkerForSchool(school, map));
    return schoolData;
  }

  // Crée un marqueur pour une école spécifique
  private createMarkerForSchool(schoolDetails: Schooldetails, map: L.Map): void {
    // On construit le marqueur à partir des détails de l'école
    const marker: L.Marker<L.LatLngExpression> = this.constructMarker(schoolDetails);
    // On rattache une infobulle au marqueur
    this.bindPopupToMarker(marker, schoolDetails);
    // On lie des évènements au marqueur
    this.bindEventsToMarker(marker);
    // On ajoute le marqueur à la carte
    marker.addTo(map);
  }

  // Construit un marqueur à partir des données d'une école
  private constructMarker(schoolDetails: Schooldetails): L.Marker<L.LatLngExpression> {
    // On extrait les coordonnées de latitude et de longitude de la position des détails de l'école
    const {lat, lon} = schoolDetails.position;
    // On crée et renvoie le marqueur Leaflet à partir de ces coordonnées
    return L.marker([lat, lon]);
  }

  // Associe un popup à un marqueur
  private bindPopupToMarker(marker: L.Marker<L.LatLngExpression>, schoolDetails: Schooldetails): void {
    // Crée une infobulle à partir des détails de l'école
    const popup: string = this.popupService.makeSchoolPopup(schoolDetails);
    // Lie l'infobulle au marqueur
    marker.bindPopup(popup);
  }

  // Associe des événements à un marqueur
  private bindEventsToMarker(marker: L.Marker<L.LatLngExpression>): void {
    // Lorsque l'infobulle du marqueur est ouverte, ajoute un gestionnaire d'événements à cet événement
    marker.on('popupopen', this.addEventHandlerToPopupOpen.bind(this));
    // Lorsque l'infobulle du marqueur est fermée,
    // elle appelle la fonction handlePopupClose avec le marqueur en argument
    marker.on('popupclose', () => this.handlePopupClose(marker));
  }

  // Ajoute un gestionnaire d'événement à l'ouverture d'un popup
  private addEventHandlerToPopupOpen(e: L.LeafletEvent): void {
    // Construction de l'élément d'événement à partir de l'événement passé.
    const eventElement: LeafletEventElement | null = this.constructLeafletEventElement(e);
    // Vérification de l'existence de l'élément d'événement.
    if (eventElement !== null) {
      // Vérification de l'existence du bouton de détails et de l'élément d'identifiant de l'école.
      if (eventElement.detailsButton !== null && eventElement.schoolIdElement !== null) {
        // Ajout d'un écouteur d'événements sur le bouton de détails.
        this.addDetailsButtonClickListener(eventElement.detailsButton, eventElement.schoolIdElement);
      }
    }
  }

  // Récupère un élément spécifique dans le contenu d'un popup
  private retrieveElement(content: HTMLElement, className: string): HTMLElement | null {
    // Si le contenu est donné, cherche l'élément ayant className comme classe, sinon retourne null
    return content ? content.querySelector(className) : null;
  }

  // Construit un objet LeafletEventElement à partir d'un événement Leaflet
  private constructLeafletEventElement(e: L.LeafletEvent): LeafletEventElement | null {
    try {
      // récupère la fenêtre popup de l'événement
      const popUp = e.popup;
      // récupère le contenu HTML du popup
      const content: HTMLElement = popUp?.getElement();
      // recherche et récupère l'élément HTML du bouton "details" dans le contenu
      const detailsButton: HTMLElement | null = this.retrieveElement(content, '.details-button');
      // recherche et récupère l'élément HTML de l'ID de l'école dans le contenu
      const schoolIdElement: HTMLElement | null = this.retrieveElement(content, '.school-id');
      // si le bouton "details" et l'élément contenant l'ID
      // de l'école existent, créer un nouvel objet LeafletEventElement
      if (detailsButton && schoolIdElement) {
        return new LeafletEventElement(detailsButton, schoolIdElement);
      }
      // si non, retourne null
      return null;
    } catch (error) {
      // en cas d'erreur, affiche l'erreur dans la console et retourne null
      console.error("Erreur lors de la construction de l'élément LeafletEventElement : ", error);
      return null;
    }
  }

  // Ajoute un gestionnaire d'écoute de clic au bouton Détails d'un popup
  private addDetailsButtonClickListener(detailsButton: HTMLElement, schoolIdElement: HTMLElement): void {
    // attache un écouteur d'événements 'click' au bouton de détails
    detailsButton.addEventListener('click', async (): Promise<void> => {
      // récupère l'ID de l'école à partir du contenu de l'élément d'ID de l'école
      const schoolId: string = schoolIdElement.textContent ?? '';
      try {
        // navigue vers l'URL '/form/{schoolId}', où schoolId est l'ID de l'école
        await this.router.navigate(['/form', schoolId]);
      } catch (navigationError) {
        // en cas d'erreur de navigation, affiche l'erreur dans la console
        console.error("Erreur lors de la navigation: ", navigationError);
      }
    });
  }

// Gère la fermeture du popup en supprimant tous les gestionnaires d'événements du marqueur
  private handlePopupClose(marker: L.Marker): void {
    // Efface tous les écouteurs d'événements attachés au marqueur
    marker.clearAllEventListeners();
  }
}

// Classe LeafletEventElement qui regroupe un bouton Détails et un élément d'identifiant d'école
class LeafletEventElement {
  // Le constructeur initialise les propriétés detailsButton et schoolIdElement lors de l'instanciation de l'objet
  constructor(
    // Bouton de détails sur la carte
    public readonly detailsButton: HTMLElement | null,
    // Élément contenant un identifiant d'école
    public readonly schoolIdElement: HTMLElement | null
  ) {
  }
}
