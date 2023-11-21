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
            `<div>Statut : ${data.statut_public_prive}</div>`
    }
}
