import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { MapInfoWindow} from "@angular/google-maps";
import {Schooldetails} from "../schooldetails";
import { Router } from '@angular/router';


@Component({
  selector: 'google-maps',
  template:
    `
        <google-map width="100%" height="90%" [options]="options" *ngIf="apiLoaded | async">
            <map-marker *ngFor="let marker of markers"
                        [position]="marker.position"
                        (mapMarkerClick)="openInfo(marker)">
            </map-marker>
            <map-info-window>
              <h2>{{selectedMarker?.title}}</h2>
              <p>{{selectedMarker?.info}}</p>
              <button (click)="goToReservation()">Reserve</button>
            </map-info-window>
        </google-map>
    `,
})
export class GoogleMapsComponent implements AfterViewInit{
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;


  options: google.maps.MapOptions = {
    center: {lat: 46.15522996311655, lng: -1.16119538510170113},
    zoom: 14,
    mapId: '944fbdb5aa4c11c8',
    // disableDefaultUI: true,
  };
  code_commune : string = "17300"

  api_url : string = "https://data.education.gouv.fr/api/v2/catalog/datasets/fr-en-annuaire-education/records?where=code_commune%3D%22" + this.code_commune + "%22"

  markers: { position: { lat: number, lng: number }, label: { color: string, text: string }, title: string, info: string, }[] = [];
  loadSchools() {
    this.http.get<Schooldetails>(this.api_url).subscribe(res => {
      for (let school of res.records) {
        console.log(school)
        const marker = new google.maps.Marker({
          position: {
            lat: school.record.fields.latitude,
            lng: school.record.fields.longitude,
          },
          label: {
            color: 'white',
            text: school.record.fields.nom_etablissement,
          },
          title: school.record.fields.nom_etablissement,
          info: school.record.fields.adresse_1 + ', ' + school.record.fields.type + ', ' + school.record.fields.libelle_nature,
        });
        marker.addListener('click', () => {
          this.openInfo(marker);
        });
        this.markers.push(marker);
      }
    });
  }
  ngAfterViewInit() {
    this.loadSchools();
  }
  selectedMarker: any;

  openInfo(marker: any) {
    console.log('openInfo called', marker);
    if (this.infoWindow && marker) {
      this.selectedMarker = marker;
      this.infoWindow.open(marker);
    } else {
      console.error('InfoWindow or marker are undefined');
    }
  }

  goToReservation() {
    this.router.navigate(['/reservation']);
  }

  apiLoaded: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {

      this.loadSchools();

      this.apiLoaded = http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAnCrCZPnx88u26BlTdoqpnzT0tnhB--jk', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
