/**
 * Ce fichier contient le composant AppComponent qui est responsable de l'affichage de l'application.
 */
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {FooterComponent} from "./footer/footer.component";
import {CguContent} from "./cgu/cgu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        ToolbarComponent,
        FooterComponent,
        CguContent
    ],
    template: `
        <app-toolbar></app-toolbar> <!--Affiche la barre d'outils de l'application-->
        <router-outlet></router-outlet> <!--Affiche le contenu de l'application basé sur le routage-->
        <app-footer></app-footer> <!--Affiche le pied de page de l'application-->
    `,
    styleUrl: './app.component.sass'
})
export class AppComponent {
    title = 'Localisateur d\'École'; // Titre de l'application
}
