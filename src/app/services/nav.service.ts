import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }
  public appDrawer: any;

  public closeNav() {
    this.appDrawer?.close();
  }
  public openNav() {
    this.appDrawer?.open();
  }
}
