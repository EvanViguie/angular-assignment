/**

 * Ce service fournit des interfaces permettant d'interagir avec une API éducative.
 * Il peut obtenir les détails d'un établissement scolaire spécifique à partir de son identifiant.
 * Il peut également gérer un formulaire de contact en enregistrant les informations
 * fournies et en les affichant dans la console.
 * La classe SchoolsService fait usage de le HttpClient pour faire des requêtes à l'API,
 * et des Observables pour gérer les réponses de ces requêtes.
 * Cette classe est utilisée dans l'application pour fournir les données nécessaires aux composants qui en ont besoin.
 */
// Nous importons l'Injectable depuis le package angular core afin de pouvoir créer un service
import {Injectable} from '@angular/core';
// Importation de la classe Schooldetails pour utiliser les détails de l'école (modélisation du monde)
import {Schooldetails} from "./schooldetails";
// Importation du HttpClient pour pouvoir effectuer des requêtes HTTP
import {HttpClient} from '@angular/common/http';
// Importation de map et take depuis le package rxjs pour pouvoir manipuler les observables et
// limiter la quantité de données reçues
import {map, take} from 'rxjs/operators';
// Importation de l'Observable depuis le package rxjs afin de pouvoir retourner un type Observable dans les fonctions
import {Observable} from "rxjs";

// Décore la classe de la balise @Injectable pour permettre l'injection de dépendance.
@Injectable({
  // Indique que le service SchoolsService est fourni dans l'injecteur racine
  providedIn: 'root'
})
export class SchoolsService {
  // URL de l'API pour récupérer les données des écoles.
  private apiUrl: string = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets" +
    "/fr-en-annuaire-education/records?"

  // Le constructeur du service, avec le client HttpClient injecté.
  constructor(
    private http: HttpClient,
  ) {
  }

  // Récupère les détails d'une école à partir de son ID.
  getSchoolDetailsById(id: string): Observable<Schooldetails | undefined> {
    // Construit l'URL de l'API.
    const url: string = this.buildSchoolDetailsApiUrl(id);
    // Envoie une requête GET à l'API.
    return this.http.get<{ results: Schooldetails[] }>(url)
      .pipe(
        // Ne prend que le premier résultat de la réponse HTTP.
        take(1),
        // Map les données renvoyées par l'API vers un objet Schooldetails ou undefined si les données sont vides.
        map((res: { results: Schooldetails[] } | undefined): Schooldetails | undefined => {
          return res && res.results && res.results.length > 0 ? res.results[0] : undefined;
        })
      );
  }

  // Enregistre les informations d'un formulaire de contact sous forme de message console.
  submitContact(
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string,
    termsAndConditions: string
  ): void {
    // Le format du message de contact.
    const receivedContactMessage: string = `Contact received;
    firstName: ${firstName},
    lastName: ${lastName},
    email: ${email},
    subject: ${subject},
    message: ${message},
    terms and conditions: ${termsAndConditions}`;
    // Affiche le message dans la console.
    console.log(receivedContactMessage);
  }

  // Construit l'URL pour l'API de récupération des détails des écoles.
  private buildSchoolDetailsApiUrl(id: string): string {
    // Incorpore l'ID de l'école dans l'URL.
    return `${this.apiUrl}refine=identifiant_de_l_etablissement%3A"${id}"`;
  }
}
