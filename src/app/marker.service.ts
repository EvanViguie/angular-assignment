/**
 * Ce fichier contient le code du service Marker.
 * Il est utilisé pour récupérer les données des écoles à partir d'une API et créer des marqueurs pour chaque école sur une carte.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PopupService} from './popup.service';
import {Schooldetails} from "./schooldetails";
import {take} from "rxjs/operators"
import * as L from 'leaflet';
import {Router} from "@angular/router";

const SCHOOLS_API_URL: string = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?select=*&where=nom_commune%3' +
  'D%20%20%22La%20Rochelle%22%20&limit=100&refine=type_etablissement%3A%22Ecole%22&refine=type_etablissement%3A%22Coll%C3%A8ge%22&refine=type_' +
  'etablissement%3A%22Lyc%C3%A9e%22';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  constructor(
    // Injection des dépendances
    private http: HttpClient,
    private popupService: PopupService,
    private router: Router
  ) {
  }

  /**
   * Crée des marqueurs pour les écoles sur une carte.
   * @param map La carte sur laquelle ajouter les marqueurs.
   */
  makeSchoolsMarkers(map: L.Map): void {
    // Récuperation des données des écoles
    this.http.get<{ results: Schooldetails[] }>(SCHOOLS_API_URL)
      .pipe(take(1))
      .subscribe((
          res: { results: Schooldetails[] }
        ): void => {
          res.results.forEach(schoolDetails => this.createMarkerForSchool
            (schoolDetails, map)
          );
        },
      );
  }

  private createMarkerForSchool(schoolDetails: Schooldetails, map: L.Map): void {
    const longitude: number = schoolDetails.position.lon;
    const latitude: number = schoolDetails.position.lat;
    const marker: L.Marker<L.LatLngExpression> = L.marker([latitude, longitude]);

    marker.bindPopup(this.popupService.makeSchoolPopup(schoolDetails));
    marker.addTo(map);

    marker.on('popupopen', async (e) => {
      try {
        const popUp = e.popup;
        const content: HTMLElement | undefined = popUp.getElement();

        if (content) {
          const detailsButton: HTMLElement | null = content.querySelector('.details-button');
          const schoolIdElement: HTMLElement | null = content.querySelector('.school-id');

          if (detailsButton && schoolIdElement) {
            detailsButton.addEventListener('click', async (): Promise<boolean | void> => {
              const schoolId: string = schoolIdElement.textContent ?? '';

              try {
                return await this.router.navigate(['/form', schoolId]);
              } catch (navigationError) {
                console.error(navigationError)
              }
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
    marker.on('popupclose', () => {
      marker.clearAllEventListeners();
    });
  }
}

