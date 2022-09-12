import { Component, OnInit } from '@angular/core';
import { IArticoli } from 'src/app/models/Articoli';
import { ArticoliService } from 'src/services/articoli.service';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css']
})
export class GridArticoliComponent implements OnInit {

  articoli: IArticoli[] = [];

  constructor(private articoliSvc: ArticoliService) { }

  ngOnInit(): void {
    this.articoli = this.articoliSvc.getArticoli();
    console.log(this.articoli);
  }

  handleDelete = (cod: string) : void => {
    console.log("richiesta cancellazione del codice:" + cod);
    const idx : number = this.articoli.findIndex(x => x.codart === cod);
    this.articoli.splice(idx, 1);
  }

  handleEdit = (cod: string) : void => {
    console.log("richiesta modifica del codice:" + cod);
    const idx : number = this.articoli.findIndex(x => x.codart === cod);
    this.articoli[idx].descrizione = this.articoli[idx].descrizione + " M";
  }

}
