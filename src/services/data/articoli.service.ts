import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IArticoli } from 'src/app/models/Articoli';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  host: string = 'localhost';
  port: string = '5051';

  constructor(private httpClient :HttpClient) { }

  getArticoloByCode = (code: string) : Observable<IArticoli> => {
    return this.httpClient.get<IArticoli>(`http://${this.host}:${this.port}/api/articoli/cerca/codice/${code}`) // tik: ALT + 0096  oppure linux ALTGR + '
    .pipe(
      map(item => {
        this.adjustArticolo(item);
        return item;
      })
    );
  }

  getArticoloByBarcode = (barcode: string) : Observable<IArticoli> => {
    return this.httpClient.get<IArticoli>(`http://${this.host}:${this.port}/api/articoli/cerca/barcode/${barcode}`) // tik: ALT + 0096  oppure linux ALTGR + '
    .pipe(
      map(item => {
        this.adjustArticolo(item);
        return item;
      })
    );
  }

  getArticoliByDescr = (descr: string) : Observable<IArticoli[]> => {
    return this.httpClient.get<IArticoli[]>(`http://${this.host}:${this.port}/api/articoli/cerca/descrizione/${descr}`) // tik: ALT + 0096  oppure linux ALTGR + '
    .pipe(
      map(resp => {
        //resp.forEach(item => this.adjustArticolo(item));
        resp.forEach(this.adjustArticolo);
        return resp;
      })
    );
  }

  private adjustArticolo = (item : IArticoli) : void => {
    item.idStatoArt = this.formatIdStatoArt(item.idStatoArt);
  }

  formatIdStatoArt = (idStato :string) : string => {
    switch(idStato) {
      case '1': return 'Attivo';
      case '2': return 'Sospeso';
      default : return 'Eliminato';
    }
  }

}
