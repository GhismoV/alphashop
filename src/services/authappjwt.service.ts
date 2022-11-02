import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseResult, TokenJwt } from 'src/app/models/response-result';
import { environment } from 'src/environments/environment';

const sess_utente : string = 'Utente';
export const sess_authToken : string = 'AuthToken';

@Injectable({
  providedIn: 'root'
})

export class AuthappJwtService {
  host: string = environment.services.authJwt.host
  port: string = environment.services.authJwt.port

  constructor(private httpClient : HttpClient) { }

  getAuthToken = () : string  => {
    let authToken : string | null = sessionStorage.getItem(sess_authToken)
    let authHeader : string = ""
    if(authToken) authHeader = authToken
    return authHeader
  }

  autentica = (userid: string, password: string) : Observable<ResponseResult> => {
    return this.httpClient.post<TokenJwt>(`http://${this.host}:${this.port}/auth`, {username: userid, password})
    .pipe(
      map(resp => {
        let r : ResponseResult
        if(resp.token) {
          sessionStorage.setItem(sess_utente, userid)
          sessionStorage.setItem(sess_authToken, `Bearer ${resp.token}`)
          r = {
            code: "0",
            date: new Date(),
            message: resp.token
          }
        } else {
          r = {
            code: "-1",
            date: new Date(),
            message: ""
          }
        }
        return r
      })
    )
  }

  loggedUser = () : string | null => this.isLogged() ? sessionStorage.getItem(sess_utente) : ""
  isLogged = () : boolean => sessionStorage.getItem(sess_utente) ? true : false
  clearUser = () : void => sessionStorage.removeItem(sess_utente)
  clearAll = () : void => sessionStorage.clear()
}
