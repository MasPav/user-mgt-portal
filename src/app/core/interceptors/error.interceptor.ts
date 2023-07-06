import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpContextToken, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
export interface ErrorConfig {
  bypassAlertStatuses?: number[] | '*';
  retryCount?: number;
  message?: string;
}
const ERRORS: any[] = [
  { status: 500, message: 'Sorry, a server error occured. Please try again later.' },
  { status: 0, message: 'No internet connection detected.' },
  { status: 409, message: 'Record already exist' ,title:'Error'}
];

const DEFAULT_ERROR_MESSAGE = 'Sorry, something unexpected occured. Please try again later.';

export const ERROR_CONFIG_TOKEN = new HttpContextToken<ErrorConfig | null>(() => null);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private toastrService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      retry(this.getRetryCount(request)),
      catchError((error: HttpErrorResponse) => this.handlerError(request, error))
    )
  }
  getRetryCount(request: HttpRequest<any>) {
    const count = request.context.get(ERROR_CONFIG_TOKEN)?.retryCount;
    if(count) {
      return count;
    } else if(request.method === 'get') {
      return 1;
    } else {
      return 0
    }
  }
  handlerError(request: HttpRequest<unknown>, error: HttpErrorResponse) {
    if(this.bypassErrorAlert(request, error)) {
      return throwError(error);
    }
    const message = this.getErorMessage(request, error);
    this.toastrService.error(message, String(error.status));
    return throwError((error));
  }
  bypassErrorAlert(request: HttpRequest<any>, error: HttpErrorResponse) {
    const statuses = request.context.get(ERROR_CONFIG_TOKEN)?.bypassAlertStatuses;
    if(statuses === '*') {
      return true;
    } else if(statuses?.includes(error.status)){
      return true;
    } else {
      return false;
    }
  }
  getRequestMessage(request: HttpRequest<any>) {
    return request.context.get(ERROR_CONFIG_TOKEN)?.message;
  }
  getErorMessage(request: HttpRequest<unknown>, errorResponse: HttpErrorResponse): string {
    let message: string | undefined;
    if(this.getRequestMessage(request)) {
      message = this.getRequestMessage(request);
    }
    if (errorResponse.error instanceof HttpErrorResponse) {
    } else if(this.getRequestMessage(request)) {
      message = this.getRequestMessage(request);
    } else {
      const error = ERRORS.find(err => err.status === errorResponse.status);
      message = error?.message;
    }
    return message || DEFAULT_ERROR_MESSAGE;
  }
}
