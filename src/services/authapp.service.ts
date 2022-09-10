import { Injectable } from '@angular/core';

const sess_utente : string = 'Utente';

@Injectable({
  providedIn: 'root'
})

export class AuthappService {

  constructor() { }

  autentica = (userid: string, password: string) : boolean => {
    var chkResult = userid === 'Ghismo' && password === 'banana';
    if(chkResult) {
      sessionStorage.setItem(sess_utente, userid);
    }
    return chkResult;
  }

  loggedUser = () : string | null => this.isLogged() ? sessionStorage.getItem(sess_utente) : "";
  isLogged = () : boolean => sessionStorage.getItem(sess_utente) ? true : false;
  clearUser = () : void => sessionStorage.removeItem(sess_utente);
  clearAll = () : void => sessionStorage.clear();
}
