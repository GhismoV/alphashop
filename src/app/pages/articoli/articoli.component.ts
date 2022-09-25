import { Component, OnInit } from '@angular/core';
import { ArticoliService } from 'src/services/data/articoli.service';
import { IArticoli } from '../../models/Articoli';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {

  articoli$: IArticoli[] = [];
  articoliErr: string = '';

  pagina: number = 1;
  righe: number = 8;

  constructor(private articoliSvc: ArticoliService) {}

  ngOnInit(): void {
    this.articoliSvc.getArticoliByDescr('BARILLA').subscribe({
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


}
