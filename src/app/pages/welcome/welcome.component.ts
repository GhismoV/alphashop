import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalutiDataService } from 'src/services/data/saluti-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  utente: string = "";
  titolo: string = "Benvenuti in Alphashop";
  sottotitolo: string = "Visualizza le offerte del giorno";

  apiRsMsg : string = "";
  apiRsErr : string = "";

  constructor(private route: ActivatedRoute, private salutiSvc: SalutiDataService) { }

  ngOnInit(): void {
    this.utente = this.route.snapshot.params['userid'];
  }

  getSaluti = () : void => {
    this.salutiSvc.getSaluti2(this.utente).subscribe({
      next: this.handleResponse.bind(this),
      //next: (r : Object) : void => {this.handleResponse(r + ' ciuppas')},
      error: this.handleError.bind(this)
    });
  }

  handleResponse = (r : Object) : void => {
    this.apiRsMsg = r.toString();
  }

  handleError = (err : any) : void => {
    //this.apiRsErr = err.error.message + '[' + err.error.error + ']';
    this.apiRsErr = err.message + '[' + err.error + ']';
  }

}
