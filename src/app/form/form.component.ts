/**
 * Ce fichier définit un composant 'details' qui comprend un formulaire pour contacter une école spécifique.
 * L'identifiant de l'école est obtenu à partir de l'URL de la route (grâce au service ActivatedRoute), puis utilisé pour récupérer
 * les détails de l'école du service SchoolsService. Le formulaire est construit en utilisant FormBuilder, avec des champs pour le courrier
 * électronique, le nom, le prénom, l'objet, le message et une case à cocher pour les CGU (Conditions Générales d'Utilisation).
 * Les détails de l'école récupérés sont conservés dans une variable 'schoolDetails' pour une utilisation ultérieure.
 * Lors de la soumission du formulaire, la méthode submitContact() du service SchoolsService est appelée avec les valeurs du formulaire.
 */

// Importation du composant Core Angular, qui est nécessaire pour créer de nouveaux composants.
import {Component} from '@angular/core';
// Common module contient des directives Angular couramment utilisées comme NgIf et NgFor.
import {CommonModule} from '@angular/common';
// ActivatedRoute est un service qui contient des informations sur la route vers ce composant d'instance.
import {ActivatedRoute} from "@angular/router";
// Importation de SchoolsService, un service qui sera utilisé pour la gestion des données des écoles.
import {SchoolsService} from "../schools.service";
// Importation de l'interface Schooldetails qui est une représentation des détails spécifiques à une école.
import {Schooldetails} from "../schooldetails";
// Importation de TnCContent, une interface pour représenter le contenu des conditions générales.
import {TnCContent} from "../cgu/tnc.component";
// Importation de FormGroup, FormControl, Validators, ReactiveFormsModule,
// qui sont nécessaires pour gérer les formulaires et la validation de formulaires dans Angular.
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
// Importation de MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule pour
// l'utilisation de composants Material Design comme les champs de saisie, les boutons, les cases à cocher.
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from "@angular/material/checkbox";

// Déclaration de notre composant avec son sélecteur, ses modules importés et ses fichiers associés
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    TnCContent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.sass'
})

// Définition de la classe de notre composant
export class FormComponent {
  // Déclaration de nos variables
  schoolDetails: Schooldetails | undefined; // Contient les détails de l'école
  applyForm: FormGroup; // Contient le formulaire

  // Ce tableau de chaînes de caractères représente les champs de notre formulaire.
  FORM_FIELDS: string[] = ["email", "firstName", "lastName", "subject", "message", "termsAndConditions"];

  // Construction de notre composant avec plusieurs services injectés
  constructor(private route: ActivatedRoute, private schoolService: SchoolsService) {
    this.applyForm = this.createApplyForm(); // Création du formulaire
    this.fetchSchoolDetails(); // Récupération des détails de l'école
  }

  // Méthode pour la création du formulaire
  createApplyForm(): FormGroup {
    let group: any = {};
    // Pour chaque champ dans FORM_FIELDS, on crée un nouveau FormControl avec une validation requise
    this.FORM_FIELDS.forEach(input => {
      group[input] = new FormControl('', Validators.required);
    });
    // On retourne le nouveau FormGroup contenant le groupe de FormControl créé
    return new FormGroup(group);
  }

  // Méthode pour récupérer les détails de l'école
  fetchSchoolDetails(): void {
    // Récupération de l'ID de l'école à partir des paramètres de l'URL
    const schoolDetailId: string = this.route.snapshot.params['id'];
    // Appel du service SchoolService pour obtenir les détails de l'école,
    // En utilisant l'ID de l'école que nous avons récupéré plus tôt
    this.schoolService.getSchoolDetailsById(schoolDetailId).subscribe((schoolDetails: Schooldetails | undefined) : void => {
      // Stocker les détails obtenus dans la variable schoolDetails de cette classe
      this.schoolDetails = schoolDetails;
    });
  }

  // Méthode pour soumettre le formulaire de contact
  submitContact(): void {
    this.schoolService.submitContact(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.subject ?? '',
      this.applyForm.value.message ?? '',
      this.applyForm.value.termsAndConditions ?? '',
    );
  }
}
