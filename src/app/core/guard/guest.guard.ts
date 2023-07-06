import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private location: Location, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser) {
      this.location.back();
      return false;
    }
    return true;
  }
}
