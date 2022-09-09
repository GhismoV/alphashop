import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private route: Router) { }

  ngOnInit(): void { }

  gestAuth = () : void => {
    console.log(this.userId);
    if(this.userId === "Ghismo" && this.password === "banana") {
      this.route.navigate(['welcome', this.userId])
      this.autenticato = true;
    } else {
      this.autenticato = false;
    }
  }

}
