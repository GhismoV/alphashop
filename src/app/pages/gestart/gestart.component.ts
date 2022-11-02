import { FunctionExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ArticoloEmpty, IArticoli } from 'src/app/models/Articoli';
import { ICategoria } from 'src/app/models/Articoli';
import { IIva } from 'src/app/models/Articoli';
import { ResponseResult } from 'src/app/models/response-result';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  isNuovoArticolo: boolean = true;
  title: string = 'Inserisci articolo';

  codArt: string = '';
  articolo: IArticoli = new ArticoloEmpty;

  ivaList$: IIva[] = [];
  categorieList$: ICategoria[] = []

  respOp!: ResponseResult | null;


  constructor(private route: ActivatedRoute, private articoliSvc: ArticoliService, private router: Router) { }

  ngOnInit(): void {
    this.resetOp();
    this.articoliSvc.getCategorieList().subscribe(r => this.categorieList$ = r)
    this.articoliSvc.getAliquoteIvaList().subscribe(r => this.ivaList$ = r)
    this.codArt = this.route.snapshot.params['codart']
    this.isNuovoArticolo = !this.codArt;
    if(!this.isNuovoArticolo) {
      this.title = 'Modifica articolo';
      this.findArticolo();
    }
  }

  resetOp = () => {
    this.respOp = null;
  }

  findArticolo = () : void => {
    this.articoliSvc.getArticoloByCode(this.codArt).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this),
      complete: () => console.log('recupero articolo completato')
    })
  }

  handleResponse = (response: IArticoli) => {
    console.log(`Articolo ${response.codArt} trovato`);
    console.log(response);
    this.articolo = response;
  }

  handleError = (err: any) => {
    console.error(err);
    if(Array.isArray(err.error)) {
      this.respOp = err.error[0];
    } else {
      this.respOp = err.error;
    }
  }

  handleResponseOp = (r: ResponseResult) => {
    console.log(r);
    this.respOp = r;
  }

  getArticoloEan = () : string => {
    if(this.articolo && this.articolo.barcode && this.articolo.barcode.length > 0)
      return this.articolo.barcode[0].barcode;
    return '';
  }

  salvaArticolo = () => {
    this.resetOp();
    console.log(`provo a salvare le modifiche all'articolo ${this.articolo.codArt}`);
    //let obsOp: Observable<ResponseResult> = this.isNuovoArticolo ? this.articoliSvc.insertArticolo(this.articolo) : this.articoliSvc.updateArticolo(this.articolo);
    let funcOp : (a: IArticoli) => Observable<ResponseResult>;
    funcOp = this.isNuovoArticolo ? this.articoliSvc.insertArticolo : this.articoliSvc.updateArticolo;
    funcOp(this.articolo).subscribe({
      next: this.handleResponseOp.bind(this)
      /*
      next: r => {
        console.log(r);
        this.respOp = r;
      }
      */
     , error: this.handleError.bind(this)
     , complete: () => console.log("Gestione operazione su articolo completata")
    });
  }

  abort = () => {
    let params: any;

    if(this.isNuovoArticolo) {
      console.log("Annullo l'inserimento del nuovo articolo");
      params =  {};
    } else {
      console.log(`Annullo le modifiche all'articolo ${this.articolo.codArt}`);
      params =  {'queryParams': { 'filter': this.codArt}};
    }

    this.router.navigate(['articoli'], params);


  }


}
