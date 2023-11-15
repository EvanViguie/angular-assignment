import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CguContent} from "../cgu/cgu.component";
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet, CguContent, MatButtonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.sass'
})
export class FooterComponent {

}
