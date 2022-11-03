import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { AuthappService } from './authapp.service';
import { AuthappJwtService } from './authappjwt.service';
import { JwtRolesService } from './jwt-roles.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  tokenRoles: string[] = new Array<string>()

  constructor(private authSvc: AuthappJwtService, private router: Router, private jwtRolesSvc: JwtRolesService) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {
    this.tokenRoles = this.jwtRolesSvc.getUserRoles();
    let isOk: boolean = this.authSvc.isLogged();
    if (isOk) {
      let routeguardAllowedRoles : string[] = route.data['roles'];
      //console.log("ghismo - ruoli routeguard richiesta: " + routeguardAllowedRoles)
      //console.log("ghismo - ruoli del token: " + this.tokenRoles)
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
