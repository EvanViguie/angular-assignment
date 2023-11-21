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

@Injectable({
    providedIn: 'root'
})
export class MarkerService {
    // URL pour récupérer les données des écoles
    schools: string = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?select=*&where=nom_commune%3' +
        'D%20%20%22La%20Rochelle%22%20&limit=100&refine=type_etablissement%3A%22Ecole%22&refine=type_etablissement%3A%22Coll%C3%A8ge%22&refine=type_' +
        'etablissement%3A%22Lyc%C3%A9e%22';

    constructor(
        // Injection des dépendances
        private http: HttpClient,
        private popupService: PopupService
    ) {
    }

    /**
     * Crée des marqueurs pour les écoles sur une carte.
     * @param map La carte sur laquelle ajouter les marqueurs.
     */
    makeCapitalMarkers(map: L.Map): void {
        // Récuperation des données des écoles
        this.http.get<{ results: Schooldetails[] }>(this.schools)
            .pipe(take(1)) // On ne s'intéresse qu'au premier résultat
            .subscribe((res: { results: Schooldetails[] }): void => {
                    // Pour chaque école, on crée un marqueur
                    for (const c of res.results) {
                        const lon: number = c.position.lon;
                        const lat: number = c.position.lat;
                        const marker: L.Marker<L.LatLngExpression> = L.marker([lat, lon]);
                        marker.bindPopup(this.popupService.makeSchoolPopup(c)); // On lie un popup à chaque marqueur
                        marker.addTo(map); // On ajoute le marqueur à la carte
                    }
                },
                (error: any): void => {
                    // En cas d'erreur, on l'affiche dans la console
                    console.error('Error: ', error.message);
                });
    }
}
