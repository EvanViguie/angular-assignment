/**
 *Détails : Ce fichier définit un composant 'details' qui comprend un formulaire pour contacter une école spécifique.
 * L'identifiant de l'école est obtenu à partir de l'URL de la route (grâce au service ActivatedRoute), puis utilisé pour récupérer
 * les détails de l'école du service SchoolsService. Le formulaire est construit en utilisant FormBuilder, avec des champs pour le courrier
 * électronique, le nom, le prénom, l'objet, le message et une case à cocher pour les CGU (Conditions Générales d'Utilisation).
 * Les détails de l'école récupérés sont conservés dans une variable 'schoolDetails' pour une utilisation ultérieure.
 * Lors de la soumission du formulaire, la méthode submitContact() du service SchoolsService est appelée avec les valeurs du formulaire.
 */

// Nous importons plusieurs modules nécessaires pour notre composant
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {SchoolsService} from "../schools.service";
import {Schooldetails} from "../schooldetails";
import {CguContent} from "../cgu/cgu.component";
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from "@angular/material/checkbox";

// Déclaration de notre composant avec son sélecteur, ses modules importés, et ses fichiers associés
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    CguContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
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
  schoolDetails: Schooldetails | undefined;
  applyForm: FormGroup;

  // Construction de notre composant avec plusieurs services injéctés
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private schoolService: SchoolsService) {
    // Création de notre formulaire avec plusieurs contrôles
    this.applyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      objet: ['', [Validators.required]],
      message: ['', [Validators.required]],
      cgu: ['', [Validators.required]]
    });

    // Récupération des détails de l'école
    this.fetchSchoolDetails();
  }

  // Méthode pour récupérer les détails de l'école
  fetchSchoolDetails(): void {
    const schoolDetailId: string = this.route.snapshot.params['id'];
    this.schoolService.getSchoolDetailsById(schoolDetailId).then(schoolDetails => {
      this.schoolDetails = schoolDetails;
    });
  }

  // Méthode pour soumettre le formulaire de contact
  submitContact(): void {
    this.schoolService.submitContact(
      this.applyForm.value.prenom ?? '',
      this.applyForm.value.nom ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.objet ?? '',
      this.applyForm.value.message ?? '',
      this.applyForm.value.cgu ?? '',
    );
  }
}
