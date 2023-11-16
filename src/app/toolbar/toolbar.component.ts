import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet,
  ],
  template: `
      <mat-toolbar color="primary">
          <a [routerLink]="['/']">
              <img class="brand-logo" src="/assets/logo.svg" alt="Logo" aria-hidden="true">
          </a>
      </mat-toolbar>
  `,
  styleUrl: './toolbar.component.sass'
})
export class ToolbarComponent {

}
