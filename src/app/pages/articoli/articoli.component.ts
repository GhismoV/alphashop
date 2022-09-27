import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, Observer, of, OperatorFunction } from 'rxjs';
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

  filter$: Observable<string | null> = of('');
  filter: string | null = '';

  pagina: number = 1;
  righe: number = 8;

  partObs: Partial<Observer<IArticoli[]>> = {}


  filterType : number = 0;

  constructor(private articoliSvc: ArticoliService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filter$ = this.route.queryParamMap.pipe(
      map( (pm: ParamMap) => pm.get('filter') )
    );

    this.partObs = {
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    }

    this.filter$.subscribe(p => this.filter  = p);
    this.refresh();

  }

  refresh = () : void => {
    this.filterType = 0;
    this.articoliErr = '';
    if(this.filter)
      this.getArticoli(this.filter);
  }

  getArticoli = (f : string) : void => {
    this.filter = f;
    this.articoli$ = [];
    let vObs: Observable<IArticoli[]> | null = null;
    switch(this.filterType) {
      case 0: vObs = this.articoliSvc.getArticoloByCode(f).pipe(map(toVect)); break;
      //case 1: vObs = this.articoliSvc.getArticoloByBarcode(f).pipe(map(item => {return [item];})); break;
      case 1: vObs = this.articoliSvc.getArticoloByBarcode(f).pipe(map(toVect)); break;
      case 2: vObs = this.articoliSvc.getArticoliByDescr(f); break;
      default : break;
    }
    if(vObs) {
      vObs.subscribe(this.partObs);
    }
  }


  handleResponse = (resp : IArticoli[]) : void => {
    this.articoli$ = resp;
    this.filterType = 0;
  }

  handleError = (err : any) : void => {
    if(this.filterType < 2) {
      this.filterType++;
      if(this.filter)
        this.getArticoli(this.filter);
    } else {
      console.error(err);
      this.articoliErr = err.error.message;
      this.filterType = 0;
    }
  }

} // class end

function toVect<T>(item: T) : T[] {
    return [item];
}

