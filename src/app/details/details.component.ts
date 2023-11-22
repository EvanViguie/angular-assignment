import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {SchoolsService} from "../schools.service";
import {Schooldetails} from "../schooldetails";
import {CguContent} from "../cgu/cgu.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
    selector: 'app-details',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CguContent,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
    ],
    template: `
        <article>
            <section>
                <h2>{{schoolDetails?.nom_etablissement}}</h2>
                <p> {{schoolDetails?.adresse_1}}</p>
            </section>
            <section class="contact">
                <mat-form-field [formGroup]="applyForm" (submit)="submitContact()">
                    <mat-label>Prénom</mat-label>
                    <input matInput formControlName="prenom" required>
                    <label for="nom">Nom</label>
                    <input id="nom" type="text" formControlName="nom">
                    <mat-label>email</mat-label>
                    <input matInput placeholder="pat@example.com" formControlName="email" required>
                    <mat-error *ngIf="applyForm.controls['email'].invalid">{{getErrorMessage()}}</mat-error>
                    <label for="objet">Objet</label>
                    <input id="objet" type="text" formControlName="objet">
                    <label for="message">Message</label>
                    <input id="message" type="text" formControlName="message">
                    <label for="cgu">J'accepte les
                        <cgu-content></cgu-content>
                    </label>
                    <input id="cgu" type="checkbox" formControlName="cgu">
                    <button type="submit" class="primary">Validez</button>
                </mat-form-field>
                >
            </section>
        </article>
    `,
    styleUrl: './details.component.sass'
})

export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    schoolService: SchoolsService = inject(SchoolsService);
    schoolDetails: Schooldetails | undefined;

    constructor() {
        const schoolDetailId: string = this.route.snapshot.params['id'];

        this.schoolService.getSchoolDetailsById(schoolDetailId).then(schoolDetails => {
            this.schoolDetails = schoolDetails;
        });
    }

    applyForm: FormGroup = new FormGroup({
        prenom: new FormControl('', Validators.required),
        nom: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        objet: new FormControl(''),
        message: new FormControl(''),
        cgu: new FormControl('')
    });

    submitContact() {
        this.schoolService.submitContact(
            this.applyForm.value.prenom ?? '',
            this.applyForm.value.nom ?? '',
            this.applyForm.value.email ?? '',
            this.applyForm.value.objet ?? '',
            this.applyForm.value.message ?? '',
            this.applyForm.value.cgu ?? '',
        );
    }


    getErrorMessage() {
        if (this.applyForm.controls['email'].hasError('required')) {
            return 'You must enter a value';
        }
        return this.applyForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
    }

}
