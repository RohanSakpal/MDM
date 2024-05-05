import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = environment.API_URL;
  isLoggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  __isLoggedIn!: false;
  appInstanceCode: BehaviorSubject<any> = new BehaviorSubject<any>('');
  token: BehaviorSubject<any> = new BehaviorSubject<any>('');
  distributorToken: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor( public http: HttpClient, ) {

  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    if (localStorage.getItem('TOKEN')) {
      this.isLoggedIn.next(true);
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts: any = {}) {
    if (localStorage.getItem('TOKEN')) {
      this.isLoggedIn.next(true);
    }

    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }
}
