import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IArticoli } from 'src/app/models/Articoli';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {
  /*
  articoli: IArticoli[] = [
    {codart : '014600301', descrizione : 'BARILLA FARINA 1 KG', um : 'PZ', pzcart : 24, peso : 1, prezzo : 1.09, active: true, data: new Date(), imageUrl: "assets/images/prodotti/014600301.jpg"},
    {codart : "013500121", descrizione : "BARILLA PASTA GR.500 N.70 1/2 PENNE", um : "PZ", pzcart : 30, peso : 0.5, prezzo : 1.3, active: true, data: new Date(), imageUrl: "assets/images/prodotti/013500121.jpg"},
    {codart : "013500133", descrizione : "BARILLA PENNE RIGATE 500 GR", um : "PZ", pzcart : 30, peso : 0.5, prezzo : 0.89, active: true, data: new Date(), imageUrl: "assets/images/prodotti/014649001.jpg"},
    {codart : "007686402", descrizione : "FINDUS FIOR DI NASELLO 300 GR", um : "PZ", pzcart : 8, peso : 0.3, prezzo : 6.46, active: true, data: new Date(), imageUrl: "assets/images/prodotti/007686402.jpg"},
    {codart : "057549001", descrizione : "FINDUS CROCCOLE 400 GR", um : "PZ", pzcart : 12, peso : 0.4, prezzo : 5.97, active: true, data: new Date(), imageUrl: "assets/images/prodotti/057549001.jpg"}
  ]
  */

  constructor(private httpClient :HttpClient) { }

  //getArticoli = () : IArticoli[] => this.articoli;
  /*
  getArticoloByCode = (code: string) : IArticoli => {
    const idx : number = this.articoli.findIndex(item => item.codart === code);
    return this.articoli[idx];
  }
  */

  getArticoliByDescr = (descr: string) : Observable<IArticoli[]> => {
    return this.httpClient.get<IArticoli[]>(`http://localhost:5051/api/articoli/cerca/descrizione/${descr}`) // tik: ALT + 0096  oppure linux ALTGR + '
    .pipe(
      map(resp => {
        resp.forEach(item => item.idStatoArt = this.formatIdStatoArt(item.idStatoArt));
        return resp;
      })
    )

  }

  formatIdStatoArt = (idStato :string) : string => {
    switch(idStato) {
      case '1': return 'Attivo';
      case '2': return 'Sospeso';
      default : return 'Eliminato';
    }
  }

}
