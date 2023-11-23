/**
 * Résumé :
 * Ce fichier contient le code responsable du démarrage de l'application Angular.
 * Langage : TypeScript
 */
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent,
  {
    providers: [
      provideAnimations(), // Fournit les animations
      provideRouter(routeConfig), // Fournit la configuration des routes pour l'application
      provideHttpClient(), // Fournit une instance de HttpClient.
    ]
  }
).catch((err) => console.error(err));
