import { Component, OnInit } from '@angular/core';
import { IArticoli } from 'src/app/models/Articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css']
})
export class GridArticoliComponent implements OnInit {

  articoli$: IArticoli[] = [];
  articoliErr: string = '';

  constructor(private articoliSvc: ArticoliService) { }

  ngOnInit(): void {
    this.articoliSvc.getArticoliByDescr('Barilla').subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleResponse = (resp : IArticoli[]) : void => {
    this.articoli$ = resp;
  }

  handleError = (err : Object) : void => {
    this.articoliErr = err.toString();
  }

  handleDelete = (cod: string) : void => {
    console.log("richiesta cancellazione del codice:" + cod);
    const idx : number = this.articoli$.findIndex(x => x.codArt === cod);
    this.articoli$.splice(idx, 1);
  }

  handleEdit = (cod: string) : void => {
    console.log("richiesta modifica del codice:" + cod);
    const idx : number = this.articoli$.findIndex(x => x.codArt === cod);
    this.articoli$[idx].descrizione = this.articoli$[idx].descrizione + " M";
  }

}
