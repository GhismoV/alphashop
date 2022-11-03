import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ruoli } from 'src/app/models/Ruoli';
import { AuthappJwtService } from './authappjwt.service';

@Injectable({
  providedIn: 'root'
})
export class JwtRolesService {

  constructor(private authSvc: AuthappJwtService) { }

  getUserRoles = () : string[] => this.getTokenRoles(this.authSvc.getAuthToken())

  getTokenRoles = (token: string) : string[] => {
    let tokenRoles: string[] = new Array<string>()
    //let token = this.authSvc.getAuthToken()
    const jwtHelper = new JwtHelperService()
    const tokenInfoDecoded = jwtHelper.decodeToken(token)
    //console.log("ghismo token decodificato:" + JSON.stringify(tokenInfoDecoded) )
    let tokenAuthorities : any = tokenInfoDecoded ['authorities']
    if(Array.isArray(tokenAuthorities)) tokenRoles = tokenAuthorities
    else tokenRoles.push(tokenAuthorities)
    return tokenRoles
  }

  isUserAdmin = () : boolean => {
    let roles : string[] = this.getUserRoles()
    return roles.includes(Ruoli.amministratore.valueOf())
  }

}
