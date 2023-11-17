import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CguContent} from "../cgu/cgu.component";
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, CguContent, MatButtonModule],
  template:
    `
      <footer class="footer-section">
          <div class="copyright-area">
              <div class="copyright-text">
                  <p>&copy; 2023, Evan Viguié</p>
              </div>
          </div>
          <div>
              <div class="footer-menu">
                  <ul>
                      <li>
                          <cgu-content></cgu-content>
                      </li>
                      <li>
                          <button mat-button color="accent" [routerLink]="['/']">Accueil</button>
                      </li>
                  </ul>
              </div>
          </div>
      </footer>
    `,
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

}
