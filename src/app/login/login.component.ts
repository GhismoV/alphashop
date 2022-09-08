import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string = "Ghismo";
  password: string = "";
  autenticato: boolean = true;
  consentito: boolean = false;
  okMsg: string = "Utente autenticato!!!";
  errMsg: string = "Utente e/o pwd errati";

  constructor() { }

  ngOnInit(): void { }

  gestAuth = () : void => {
    console.log(this.userId);
    if(this.userId === "Ghismo" && this.password === "banana") {
      this.autenticato = true;
      this.consentito = true;
    } else {
      this.autenticato = false;
      this.consentito = false;
    }
  }

}
