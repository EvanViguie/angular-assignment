import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class PopupService {
  constructor() {
  }
  makeSchoolPopup(data: any): string {
    return `<div>Nom : ${data.nom_etablissement}</div>` +
        `<div>Adresse : ${data.adresse_1}</div>` +
        `<div>Type : ${data.type_etablissement}</div>` +
        `<div>Statut : ${data.statut_public_prive}</div>` +
        `<div id="school-id" style="display: none;">${data.identifiant_de_l_etablissement}</div>` +
        `<button  id="details-button" style="background-color: #3f51b5; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer">Contact</button>`;  }
}
