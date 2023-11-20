/**
 * Résumé :
 * Ce fichier contient le code responsable du démarrage de l'application Angular.
 * Langage : TypeScript
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(), // Fournit un support pour les tests avec Protractor
      provideRouter(routeConfig) // Fournit la configuration des routes pour l'application
    ]
  }
).catch((err) => console.error(err));
