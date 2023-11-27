/**
 * Ce fichier contient le composant FooterComponent qui représente le pied de page de l'application.
 */
// Le module Component de @angular/core est nécessaire pour la création de nouvelles composantes Angular.
import {Component} from '@angular/core';
// Les modules RouterLink et RouterOutlet de @angular/router fournissent les
// fonctionnalités de routage pour une application Angular
import {RouterLink, RouterOutlet} from "@angular/router";
// Importation du module 'TnCContent' de ../cgu/tnc.component
import {TnCContent} from "../cgu/tnc.component";
// Importation du module MatButtonModule de @angular/material/button pour les
// manipulations liées au bouton de Material Design.
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    TnCContent,
    MatButtonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {
}
