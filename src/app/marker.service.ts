/**
 * Ce fichier contient le code du service Marker.
 * Il est utilisé pour récupérer les données des écoles à partir d'une API et créer des marqueurs pour chaque école sur une carte.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PopupService} from './popup.service';
import {Schooldetails} from "./schooldetails";
import { Observable } from 'rxjs';
import * as L from 'leaflet';
import {Router} from "@angular/router";
import {take, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private readonly SCHOOLS_API_URL: string = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?select=*&where=nom_commune%3' +
    'D%20%20%22La%20Rochelle%22%20&limit=100&refine=type_etablissement%3A%22Ecole%22&refine=type_etablissement%3A%22Coll%C3%A8ge%22&refine=type_' +
    'etablissement%3A%22Lyc%C3%A9e%22';
  constructor(
    // Injection des dépendances
    private http: HttpClient,
    private popupService: PopupService,
    private router: Router
  ) {
  }

  fetchSchoolData(): Observable<Schooldetails[]> {
    return this.http.get<{ results: Schooldetails[] }>(this.SCHOOLS_API_URL)
      .pipe(
        map(response => response.results),
        take(1)
      );
  }

  addMarkers(schoolData: Schooldetails[], map: L.Map): Schooldetails[] {
    schoolData.forEach(school => this.createMarkerForSchool(school, map));
    return schoolData;
  }

  private createMarkerForSchool(schoolDetails: Schooldetails, map: L.Map): void {
    const marker: L.Marker<L.LatLngExpression> = this.constructSchoolMarker(schoolDetails);
    marker.addTo(map);
    marker.on('popupopen', this.handlePopupOpen.bind(this));
    marker.on('popupclose', () => this.handlePopupClose(marker));
  }

  private constructSchoolMarker(schoolDetails: Schooldetails): L.Marker<L.LatLngExpression> {
    const longitude: number = schoolDetails.position.lon;
    const latitude: number = schoolDetails.position.lat;
    const marker: L.Marker<L.LatLngExpression> = L.marker([latitude, longitude]);
    marker.bindPopup(this.popupService.makeSchoolPopup(schoolDetails));
    return marker;
  }

  private async handlePopupOpen(e: L.LeafletEvent): Promise<void> {
    try {
      const popUp = e.popup;
      const content: HTMLElement | undefined = popUp.getElement();
      if (content) {
        const detailsButton: HTMLElement | null = content.querySelector('.details-button');
        const schoolIdElement: HTMLElement | null = content.querySelector('.school-id');
        if (detailsButton && schoolIdElement) {
          this.addDetailsButtonClickListener(detailsButton, schoolIdElement);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  private addDetailsButtonClickListener(detailsButton: HTMLElement, schoolIdElement: HTMLElement): void {
    detailsButton.addEventListener('click', async (): Promise<boolean | void> => {
      const schoolId: string = schoolIdElement.textContent ?? '';
      try {
        return await this.router.navigate(['/form', schoolId]);
      } catch (navigationError) {
        console.error(navigationError);
      }
    });
  }

  private handlePopupClose(marker: L.Marker): void {
    marker.clearAllEventListeners();
  }
}
