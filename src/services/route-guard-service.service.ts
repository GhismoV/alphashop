import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { AuthappService } from './authapp.service';
import { AuthappJwtService } from './authappjwt.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  token: string = ''
  tokenRoles: string[] = new Array<string>()


  constructor(private authSvc: AuthappJwtService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {

    this.token = this.authSvc.getAuthToken()
    const jwtHelper = new JwtHelperService()
    const tokenInfoDecoded = jwtHelper.decodeToken(this.token)
    console.log("ghismo token decodificato:" + JSON.stringify(tokenInfoDecoded) )
    let tokenAuthorities : any = tokenInfoDecoded ['authorities']

    if(Array.isArray(tokenAuthorities)) this.tokenRoles = tokenAuthorities
    else this.tokenRoles.push(tokenAuthorities)

    let isOk: boolean = this.authSvc.isLogged();
    if (isOk) {
      let routeguardAllowedRoles : string[] = route.data['roles'];
      console.log("ghismo - ruoli routguard richiesta: " + routeguardAllowedRoles)
      console.log("ghismo - ruoli del token: " + this.tokenRoles)
      if(routeguardAllowedRoles !== null && routeguardAllowedRoles.length > 0) {
        isOk = this.tokenRoles.some( r => routeguardAllowedRoles.includes(r))
      }
      if(!isOk) {
        this.router.navigate(['forbidden'])
      }
    } else {
      this.router.navigate(['login'])
    }
    return isOk;
  }

}
