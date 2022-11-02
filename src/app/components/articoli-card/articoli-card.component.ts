import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticoloEmpty, IArticoli } from 'src/app/models/Articoli';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrls: ['./articoli-card.component.css']
})
export class ArticoliCardComponent implements OnInit {

  constructor() { }

  @Input()
  articolo: IArticoli = new ArticoloEmpty;
  /*
  articolo: IArticoli = {
    codArt: '',
    codStat: true,
    dataCreazione: new Date(),
    descrizione: '',
    imageUrl: '',
    pesoNetto: 0,
    prezzo: 0,
    idStatoArt: '',
    descrStatoArt: '',
    pzCart: 0,
    um: ''
  }*/

  @Output() delete  : EventEmitter<string>  = new EventEmitter();
  @Output() edit    : EventEmitter<string>  = new EventEmitter();

  ngOnInit(): void {
  }

  editArt = () : void => this.edit.emit(this.articolo.codArt);
  deleteArt = () : void => this.delete.emit(this.articolo.codArt);

}
