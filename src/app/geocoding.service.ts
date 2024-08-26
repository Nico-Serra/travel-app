import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as opencage from 'opencage-api-client';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocodeAddress(address: string): Observable<[number, number]> {
    return new Observable(observer => {
      opencage
        .geocode({ q: address, key: environment.openCageApiKey })
        .then(response => {
          if (response.results.length > 0) {
            const { lat, lng } = response.results[0].geometry;
            observer.next([lat, lng]);
            observer.complete();
          } else {
            observer.error('Nessun risultato trovato');
          }
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}