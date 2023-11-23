import {Component} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

// Déclare le composant 'cgu-content'
@Component({
  selector: 'cgu-content',
  template: `
    <button mat-flat-button color="basic" (click)="openDialog()">CGU</button>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class CguContent {
  // Injecte MatDialog dans le constructeur
  constructor(public dialog: MatDialog) {
  }

  // Ouvre le dialogue lorsque le bouton est cliqué
  openDialog() {
    const dialogRef = this.dialog.open(CguContentDialog);
  }
}

// Déclare le composant 'cgu-content-dialog'
@Component({
  selector: 'cgu-content-dialog',
  templateUrl: 'cgu.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class CguContentDialog {
}
