import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalutiDataService {

  constructor(private httpClient: HttpClient) { }

  getSaluti = () : string => "Tuuuuuuuu, tu che sei diverso!";
  getSaluti2 = (nome: string) : Observable<Object> => this.httpClient.get('http://localhost:8050/api/saluti/' + nome);

}
