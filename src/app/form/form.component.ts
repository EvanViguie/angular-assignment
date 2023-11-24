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
import {TnCContent} from "../cgu/tnc.component";
import {FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
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

  // Construction de notre composant avec plusieurs services injectés
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private schoolService: SchoolsService) {
    this.applyForm = this.createApplyForm(); // Création du formulaire
    this.fetchSchoolDetails(); // Récupération des détails de l'école
  }
  // Méthode pour la création du formulaire
  createApplyForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      termsAndConditions: ['', [Validators.required]]
    });
  }
  // Méthodes pour créer des contrôles formels
  private createEmailControl(): FormControl {
    return this.fb.control('', [Validators.required, Validators.email]);
  }

  private createFirstNameControl(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  private createLastNameControl(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  private createSubjectControl(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  private createMessageControl(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  private createTnCControl(): FormControl {
    return this.fb.control('', [Validators.required]);
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
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.subject ?? '',
      this.applyForm.value.message ?? '',
      this.applyForm.value.termsAndConditions ?? '',
    );
  }
}
