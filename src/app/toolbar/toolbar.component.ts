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
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.sass'
})
export class ToolbarComponent {

}
