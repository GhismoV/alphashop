import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, Observer, of, OperatorFunction } from 'rxjs';
import { ResponseResult } from 'src/app/models/response-result';
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


  // -------------------------


  constructor(private articoliSvc: ArticoliService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.filter$ = this.route.queryParamMap.pipe(
      map( (pm: ParamMap) => pm.get('filter') )
    );

    this.partObs = {
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this),
      complete: () => console.log('completata elaborazione risposta del server')
    }

    this.filter$.subscribe(p => this.filter  = p);
    this.refresh();

  }

  refresh = () : void => {
    this.refreshOp()
    this.pagina = 1;
    this.filterType = 0;
    if(this.filter)
      this.getArticoli(this.filter);
  }

  refreshOp = () : void => {
    this.articoliErr = '';
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

  elimina = (codArt : string) : void => {
    this.refreshOp();
    this.articoliSvc.delArticoloByCode(codArt).subscribe({
      next: r => this.handleDelOk(r, codArt),
      error: this.handleDelKo.bind(this),
      complete: () => console.log('completata elaborazione risposta del server')
    })
  }

  handleDelOk = (resp: ResponseResult, codArticolo: string) : void => {
    console.log(resp);
    if(resp.code === '0') {
      this.articoli$ = this.articoli$.filter(item => item.codArt !== codArticolo);
    }
  }

  handleDelKo = (err: any) : void => {
    console.log(err);
    this.articoliErr = err.error.message;
  }

  modifica = (codArt : string) : void => {
    this.refreshOp();
    console.log(`Modifica articolo ${codArt}`);
    this.router.navigate(['gestart', codArt])
  }

  nuovo = () => {
    console.log("Inserimento nuovo articolo");
    this.router.navigate(['gestart']);
  }


} // class end


function toVect<T>(item: T) : T[] {
    return [item];
}

