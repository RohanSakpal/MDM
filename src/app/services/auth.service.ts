import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api: ApiService) { }

  public verifyAccount(body: any): Observable<any> {
    return this.api.post('authentication', body, {}).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(error);
    }
    if (error.status == 498) {
      return of('Unauthorize user');
    }
    else {
      return throwError(error);
    }
  }
}
