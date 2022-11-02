import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseResult } from 'src/app/models/response-result';
import { environment } from 'src/environments/environment';

const sess_utente : string = 'Utente';
export const sess_authToken : string = 'AuthToken';

@Injectable({
  providedIn: 'root'
})

export class AuthappService {
  host: string = environment.services.articoli.host
  port: string = environment.services.articoli.port

  constructor(private httpClient : HttpClient) { }

  autentica = (userid: string, password: string) : Observable<ResponseResult> => {
    let authString : string = "Basic " + window.btoa(userid + ":" + password)
    let headers : HttpHeaders = new HttpHeaders(
      { Authorization: authString }
    )
    return this.httpClient.get<ResponseResult>(`http://${this.host}:${this.port}/api/articoli/testAuth`, { headers })
    .pipe(
      map(resp => {
        if(resp.code === "0") {
          sessionStorage.setItem(sess_utente, userid)
          sessionStorage.setItem(sess_authToken, authString)
        }
        return resp
      })
    )
  }

  /*
  autentica = (userid: string, password: string) : boolean => {
    var chkResult = userid === 'Ghismo' && password === 'banana';
    if(chkResult) {
      sessionStorage.setItem(sess_utente, userid);
    }
    return chkResult;
  }
  */

  loggedUser = () : string | null => this.isLogged() ? sessionStorage.getItem(sess_utente) : ""
  isLogged = () : boolean => sessionStorage.getItem(sess_utente) ? true : false
  clearUser = () : void => sessionStorage.removeItem(sess_utente)
  clearAll = () : void => sessionStorage.clear()
}
