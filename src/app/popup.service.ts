/** Ce service est conçu pour fournir des méthodes qui permettent de créer des popups pour les écoles.
 * Il est marqué comme injectable et est fourni dans le scope 'root', ce qui signifie qu'une seule instance
 * de ce service est créée et utilisée dans toute l'application.
 */
// Importation du décorateur Injectable d'Angular, qui permet d'injecter ce service dans d'autres classes.
import {Injectable} from '@angular/core';

// Utilisation du décorateur Injectable pour marquer la classe PopupService comme un service qui peut être injecté.
@Injectable({
  providedIn: 'root'
})

export class PopupService {
  constructor() {
  }

  // Définition de la méthode makeSchoolPopup, qui génère une chaîne de caractères HTML sur base des données d'une école.
  makeSchoolPopup(data: any): string {
    // Retour d'une chaîne de caractères contenant du code HTML.
    return `<div>Nom: ${data.nom_etablissement}</div>
            <div>Adresse: ${data.adresse_1}</div>
            <div>Type: ${data.type_etablissement}</div>
            <div>Statut: ${data.statut_public_prive}</div>
            <div class="school-id" style="display: none;">${data.identifiant_de_l_etablissement}</div>
            <button class="details-button" style="background-color: #3f51b5; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer">Contact</button>`;
  }
}
