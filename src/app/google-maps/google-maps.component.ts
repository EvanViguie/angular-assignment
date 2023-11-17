import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'google-maps',
  template:
    `
      <google-map width="100%" height="90%" [options]="options" *ngIf="apiLoaded | async"></google-map>
    `,
})
export class GoogleMapsComponent {
  options: google.maps.MapOptions = {
    center: {lat: 46.15522996311655, lng: -1.16119538510170113},
    zoom: 14,
    mapId: '944fbdb5aa4c11c8',
    disableDefaultUI: true,
  };
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {

    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAnCrCZPnx88u26BlTdoqpnzT0tnhB--jk', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

  }
}
