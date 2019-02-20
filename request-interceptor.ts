import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { SharedDataService } from './sharedData.service';

// import { AuthService } from './auth/auth.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {


  private spinnerTimeOut: any;
  pendingRequests: Array<any> = [];

  constructor(private sharedDataSvc: SharedDataService
              /*authSvc: AuthService*/) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // // Do stuff with the request
    this.sharedDataSvc.showMainSpinner();
    this.pendingRequests.push(request); // Push made request to an array
    clearTimeout(this.spinnerTimeOut); // Clear timeout on new request

    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${this.authSvc.getToken()}}`
    //   }
    // });

    return next.handle(request).do((response: HttpEvent<any>) => {
      if (response instanceof HttpResponse) {
        // do stuff with response if you want
        // Remove request that got properly resolved
        this.pendingRequests = this.pendingRequests.filter(pendingRequest => !(response.url.indexOf(pendingRequest.url) !== -1));

        // Hide spinner only if all requests are resolved; At least 400ms screen time for the spinner
        if (!this.pendingRequests.length) {
          this.spinnerTimeOut = setTimeout(() => {
            this.sharedDataSvc.hideMainSpinner();
            clearTimeout(this.spinnerTimeOut);
          }, 400);
        }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Call error service etc.
        clearTimeout(this.spinnerTimeOut);
        this.sharedDataSvc.hideMainSpinner();
      }
    });
  }
}
