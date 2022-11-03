import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthappJwtService } from 'src/services/authappjwt.service';
//import { AuthappService } from 'src/services/authapp.service';

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
  errMsg: string = "Login non avvenuta";
  titolo: string = "Accesso & Autenticazione";
  sottotitolo: string = "Inserisci userid e pwd, oppure registrati";

  //constructor(private router: Router, private authSvc: AuthappService) { }
  constructor(private router: Router, private authSvc: AuthappJwtService) { }

  ngOnInit(): void { }

  gestAuth = () : void => {
    console.log(this.userId);
    this.authSvc.autentica(this.userId, this.password).subscribe({
      next: r => {
        this.autenticato = r.code === "0"
        this.router.navigate(['welcome', this.userId])
      },
      error: (err) => {
        this.autenticato = false
        if(err.message || err.error.message) {
          //this.errMsg = err.error.message
          this.errMsg = err.message
        }
      },
      complete: () => console.log("Autenticazione " + this.autenticato ? "OK" : "non avvenuta")
    })
  }

}
