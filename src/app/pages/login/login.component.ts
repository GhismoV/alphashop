import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthappService } from 'src/services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string = "Ghismo";
  password: string = "";
  autenticato: boolean = true;
  okMsg: string = "Utente autenticato!!!";
  errMsg: string = "Utente e/o pwd errati";
  titolo: string = "Accesso & Autenticazione";
  sottotitolo: string = "Inserisci userid e pwd, oppure registrati";

  constructor(private route: Router, private BasicAuth: AuthappService) { }

  ngOnInit(): void { }

  gestAuth = () : void => {
    console.log(this.userId);

    if(this.BasicAuth.autentica(this.userId, this.password)) {
      this.route.navigate(['welcome', this.userId])
      this.autenticato = true;
    } else {
      this.autenticato = false;
    }
  }

}
