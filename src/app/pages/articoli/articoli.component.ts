import { Component, OnInit } from '@angular/core';
import { ArticoliService } from 'src/services/articoli.service';
import { IArticoli } from '../../models/Articoli';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {

  articoli: IArticoli[] = []

  constructor(private articoliSvc: ArticoliService) {}

  ngOnInit(): void {
    this.articoli = this.articoliSvc.getArticoli();
  }

}
