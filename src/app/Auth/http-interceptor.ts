import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
  } from '@angular/common/http';
  import {Injectable} from '@angular/core';
  import {EMPTY, fromEvent, Observable, Subscription, throwError} from 'rxjs';
  import {catchError} from 'rxjs/operators';
  import {Router} from '@angular/router';
  
  @Injectable()
  export class HttpAuthInterceptor implements HttpInterceptor {
    blacklist: any = [];
    onlineEvent: Observable<Event>;
    offlineEvent: Observable<Event>;
    subscriptions: Subscription[] = [];
    isOffline = false;
  
    constructor(
                private router: Router) {
      /**
       * Get the online/offline status from browser window
       */
      this.onlineEvent = fromEvent(window, 'online');
      this.offlineEvent = fromEvent(window, 'offline');
  
      this.subscriptions.push(this.onlineEvent.subscribe(e => {
        this.isOffline = false;
      }));
  
      this.subscriptions.push(this.offlineEvent.subscribe(e => {
        //this.toastrService.danger('Connection lost! You are not connected to internet', 'Offline!');
        this.isOffline = true;
      }));
    }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this.isOffline) {
        //this.toastrService.danger('Connection lost! You are not connected to internet', 'Offline!');
        return EMPTY;
      }
  
      let newHeaders = new HttpHeaders();
      newHeaders = newHeaders.append('appInstanceCode', localStorage.getItem('appInstanceCode')|| '{}');
  
      if (localStorage.getItem('TOKEN')) {
        newHeaders = newHeaders.append('token', localStorage.getItem('TOKEN')|| '{}');
      }
      const hasContentType: boolean = request.headers.has('Content-Type');
      if (!hasContentType) {
        newHeaders = newHeaders.append('Content-Type', 'application/json; charset=utf-8');
      }
  
      const basicAuthRequest = request.clone({headers: newHeaders});
  
      return next.handle(basicAuthRequest).
      pipe(catchError((error: HttpErrorResponse) => {
          if (error.status === 498) {
            // redirect to the login route
            // or show a modal
            console.log('Unauthorized ERROR', error);
            localStorage.clear();
            this.router.navigateByUrl('/');
  
            //this.toastrService.danger(error && error.message ? error.message : 'Internal server error', 'Error!');
          }
        return throwError(error);
        }))
        ;
    }
  
    blacklistCheckup($url: string): boolean {
      let returnValue = false;
      for (const i of Object.keys(this.blacklist)) {
        if (this.blacklist[i].exec($url) !== null) {
          returnValue = true;
          break;
        }
      }
      return returnValue;
    }
  }
  