import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IArticoli } from 'src/app/models/Articoli';
import { ICategoria } from 'src/app/models/Articoli';
import { IIva } from 'src/app/models/Articoli';
import { ResponseResult } from 'src/app/models/response-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  host: string = environment.services.articoli.host
  port: string = environment.services.articoli.port


  constructor(private httpClient :HttpClient) {}

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
    item.descrStatoArt = this.formatIdStatoArt(item.idStatoArt);
  }

  formatIdStatoArt = (idStato :string) : string => {
    switch(idStato) {
      case '1': return 'Attivo';
      case '2': return 'Sospeso';
      default : return 'Eliminato';
    }
  }

  delArticoloByCode = (code: string) : Observable<ResponseResult> => {
    return this.httpClient.delete<ResponseResult>(`http://${this.host}:${this.port}/api/articoli/elimina/${code}`);
  }

  getAliquoteIvaList = () : Observable<IIva[]> => {
    return this.httpClient.get<IIva[]>(`http://${this.host}:${this.port}/api/iva`);
  }

  getCategorieList = () : Observable<ICategoria[]> => {
    return this.httpClient.get<ICategoria[]>(`http://${this.host}:${this.port}/api/categoria`);
  }

  insertArticolo = (articolo: IArticoli) : Observable<ResponseResult> => {
    const headers = new HttpHeaders({ 'content-type': 'application/json', 'accept': 'application/json' });
    return this.httpClient.post<ResponseResult>(`http://${this.host}:${this.port}/api/articoli/inserisci`, articolo, {headers});
  }

  updateArticolo = (articolo: IArticoli) : Observable<ResponseResult> => {
    const headers = new HttpHeaders({ 'content-type': 'application/json', 'accept': 'application/json' });
    return this.httpClient.put<ResponseResult>(`http://${this.host}:${this.port}/api/articoli/modifica`, articolo, {headers});
  }

}
