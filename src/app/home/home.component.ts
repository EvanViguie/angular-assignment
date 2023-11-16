import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsDemoModule} from "../google-maps/google-maps.module";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        GoogleMapsDemoModule
    ],
    template: `
        <google-maps></google-maps>
    `,
    styleUrl: './home.component.sass'
})
export class HomeComponent {

}
