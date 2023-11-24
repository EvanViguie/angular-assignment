/**
 * Ce fichier contient le composant FooterComponent qui représente le pied de page de l'application.
 * Nous avons importé les packages nécessaires pour ce composant, notamment 'Component' de '@angular/core' qui est essentiel pour tout composant Angular,
 * ainsi que 'RouterLink' et 'RouterOutlet' de '@angular/router' qui sont utilisés pour la navigation dans l'application.
 * 'TnCContent' fait référence à notre composant Conditions Générales d'Utilisation, et 'MatButtonModule' est un module
 * de Material Angular pour utiliser les boutons Material Design.
 */
import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {TnCContent} from "../cgu/tnc.component";
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink, RouterOutlet, TnCContent, MatButtonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.sass'
})
export class FooterComponent {
}
