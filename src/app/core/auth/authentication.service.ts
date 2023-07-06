import { HttpService } from '../services/http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthUser, Role } from './models';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../constants';
import { EndPoints } from '../endpoints';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //private
  private currentUser$: BehaviorSubject<AuthUser>;
  private currentRole$: BehaviorSubject<Role | null> = new BehaviorSubject<Role | null>(null);


  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService, private storageService: StorageService, private httpService: HttpService, private router: Router) {
    this.currentUser$ = new BehaviorSubject<AuthUser>(this.storageService.get('currentUser'));
    this.currentRole = this.storageService.get('currentRole');
  }

  get currentUserValue(): AuthUser {
    return this.currentUser$.value;
  }
  get currentRoleValue(): Role | null {
    return this.currentRole$.value;
  }
  get currentUser(): Observable<AuthUser> {
    return this.currentUser$.asObservable();
  }
  get currentRole(): Observable<Role | null> {
    return this.currentRole$.asObservable();
  }
  get redirectAfterLoginUrl() {
    return this.storageService.get("redirectAfterLoginUrl") || '/';
  }
  set currentUser(val: any) {
    this.currentUser$.next(val);
  }
  set currentRole(val: any) {
    this.currentRole$.next(val);
  }
  set redirectAfterLoginUrl(val: string) {
    this.storageService.set("redirectAfterLoginUrl", val);
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
   login(email: string, password: string) {
    return this.httpService
      .post(EndPoints.auth.login, { username: email, password, with: 'roles.permissions, permissions' }, { bypassAlertStatuses: [422, 423, 404] })
      .pipe(
        map(res => {
          const user = res.data;

          this.setCurrentRole(user?.roles[0]);
          this.setCurrentUser(user);

          this.router.navigate([this.redirectAfterLoginUrl]);
          this.removeRedirectUrl();
        })
      );
  }
  setCurrentRole(role: Role) {
    if(!role) {
      const message = "Your account has not been assinged a role. Kindly contact your administrator";
      this._toastrService.error(message, 'Sorry', {disableTimeOut: true});
      throw new Error(message);
    }
    this.storageService.set("currentRole", role);
    this.currentRole = role;
    this.setAllowedPermissions();
  }
  setAllowedPermissions() {
    const rolePermissions = this.currentRoleValue?.permissions.map((permission: any) => {
      return permission.name;
    });
    const allowedPermissions = rolePermissions?.filter(
      (item: any, pos: any) => rolePermissions.indexOf(item) === pos
    );
    this.storageService.set("allowedPermissions", allowedPermissions);
  }
  setCurrentUser(user: any) {
    this.storageService.set("currentUser", user);
    this.currentUser = user;
  }
  removeRedirectUrl() {
    this.storageService.clear("redirectAfterLoginUrl");
  }
  changePassword(username: string, old_password: string, new_password: string) {
    return this.httpService.put(EndPoints.changePassword, {username, old_password, new_password});
  }
  sendPasswordResetLink(email: string) {
    return this.httpService.post(EndPoints.auth.sendPasswordResetLink, {email});
  }
  resetPassword(password: string, token: string) {
    return this.httpService.post(EndPoints.auth.resetPassword, {password, token});
  }

  logout() {
    this.httpService.post(EndPoints.auth.logout, {}, {bypassAlertStatuses: '*'}).subscribe();
    this.storageService.clearExcept(['prevSkin', 'config']);
    this.currentUser = null;
    window.location.reload();
  }
  refreshToken() {
    this.httpService.post(EndPoints.auth.refreshToken, {}).subscribe({
      next: (res) => {
        const user = this.storageService.get("currentUser") as AuthUser;
        user.token = res.data.token;
        user.token_expires_at = res.data.expires_at;
        this.setCurrentUser(user);
      },
      error: (err) => {
        console.log('refresh token error', err);
      }
    });
  }
}
