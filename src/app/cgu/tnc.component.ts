/*
Ce fichier TypeScript est principalement destiné à gérer l'ouverture des modales et des dialogues dans
l'application Angular. Il définit deux services : DialogService et ModalService. DialogService est utilisé pour gérer
le composant MatDialog d'Angular Material qui est utilisé pour ouvrir les dialogues. De l'autre côté, ModalService
utilise DialogService pour ouvrir les modales. Lorsqu'il est question d'ouvrir une modale ou un dialogue, ces services
nécessitent un composant entrant pour déterminer le contenu à afficher. Ensuite, nous avons défini un composant
'TnCContent' qui affiche un bouton, et au clic sur ce bouton, un modal contenant les Termes et Conditions
est ouvert. Enfin, 'TnCContentDialog' est le composant qui contient le contenu réel à afficher dans le modal.
*/

// Importation des composants et services nécessaires
// Importation des composants nécessaires à partir du package '@angular/core'
import {Component, Injectable, Type} from '@angular/core';
// Importation du module MatDialog de '@angular/material/dialog'
// permettant d'ajouter des boîtes de dialogue dans l'application
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
// Importation du module MatButtonModule de '@angular/material/button'
// permettant d'ajouter des boutons dans l'application
import {MatButtonModule} from '@angular/material/button';

// Service pour gérer les Dialogs
@Injectable({providedIn: 'root'})
export class DialogService {
  // Utilise MatDialog pour créer des dialogues
  constructor(private dialog: MatDialog) {
  }
  // Ouvre un dialogue basé sur le composant spécifié
  open<T>(component: Type<T>) {
    return this.dialog.open(component);
  }
}

// Service pour gérer des Modals
@Injectable({providedIn: 'root'})
export class ModalService {
  // Utilise DialogService pour créer des modales
  constructor(private dialogService: DialogService) {
  }

  // Ouvre un modal basé sur le composant spécifié
  openModal<T>(component: Type<T>) {
    return this.dialogService.open<T>(component);
  }
}

// Composant qui affiche un bouton pour ouvrir les Termes et Conditions dans un modal
@Component({
  selector: 'tnc-content',
  template: `
      <button mat-flat-button color="basic" (click)="openTermsAndConditionsModal()">CGU</button>`,
  standalone: true,
  providers: [ModalService], // Fournit le service Modal pour ce composant
  imports: [MatButtonModule, MatDialogModule],
})
export class TnCContent {
  constructor(private modalService: ModalService) {
  }

  // Ouvre le modal des Termes et Conditions
  openTermsAndConditionsModal() {
    this.modalService.openModal<TnCContentDialog>(TnCContentDialog);
  }
}

// Composant qui contient le contenu du modal des Termes et Conditions
@Component({
  selector: 'terms-conditions-content-dialog',
  templateUrl: 'tnc.component.html',
  imports: [MatButtonModule, MatDialogModule],
  standalone: true
})
export class TnCContentDialog {
  constructor() {
  }
}
