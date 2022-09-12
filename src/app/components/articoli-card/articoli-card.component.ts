import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticoli } from 'src/app/models/Articoli';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrls: ['./articoli-card.component.css']
})
export class ArticoliCardComponent implements OnInit {

  constructor() { }

  @Input()
  articolo: IArticoli = {
    codart: '',
    active: true,
    data: new Date(),
    descrizione: '',
    imageUrl: '',
    peso: 0,
    prezzo: 0,
    pzcart: 0,
    um: ''
  }

  @Output() delete  : EventEmitter<string>  = new EventEmitter();
  @Output() edit    : EventEmitter<string>  = new EventEmitter();

  ngOnInit(): void {
  }

  editArt = () : void => this.edit.emit(this.articolo.codart);
  deleteArt = () : void => this.delete.emit(this.articolo.codart);

}
