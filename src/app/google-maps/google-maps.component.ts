import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'google-maps',
    template:
        `
            <google-map *ngIf="apiLoaded | async"></google-map>
        `,
})
export class GoogleMapsComponent {
    apiLoaded: Observable<boolean>;

    constructor(httpClient: HttpClient) {
        // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library
        // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
        // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization

        this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAnCrCZPnx88u26BlTdoqpnzT0tnhB--jk', 'callback')
            .pipe(
                map(() => true),
                catchError(() => of(false)),
            );
    }
}
