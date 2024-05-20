import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public statusList = [
    { value: '1', title: 'Active' },
    { value: '0', title: 'Inactive' },
  ];
  constructor(private api: ApiService) { }

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
  
  public getAllMaster(MasterDataName:string): Observable<any> {
    return this.api.get('master/' + MasterDataName, {}, {}).pipe(catchError(this.handleError));
  }
}
