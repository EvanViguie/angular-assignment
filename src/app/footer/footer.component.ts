/**
 * Ce fichier contient le composant FooterComponent qui représente le pied de page de l'application.
 * Il importe les composants et modules nécessaires, tels que CommonModule, RouterLink, RouterOutlet, CguContent et MatButtonModule.
 * Le composant est utilisé pour afficher le pied de page de l'application.
 */
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CguContent} from "../cgu/cgu.component";
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, CguContent, MatButtonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.sass'
})
export class FooterComponent {
}
