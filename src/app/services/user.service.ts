import {of as observableOf, Observable, BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../Model/users';
import { ApiService } from './api.service';


@Injectable()
export class UserService extends UserData {
  
  private time: Date = new Date;

  public currentUser: any;
  public static currentStaticUser: any;
  public currentUserCode!: string;
  public role_code!: string;
  public role_name!: string;

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.users.nick, type: this.types.mobile },
    { user: this.users.eva, type: this.types.home },
    { user: this.users.jack, type: this.types.mobile },
    { user: this.users.lee, type: this.types.mobile },
    { user: this.users.alan, type: this.types.home },
    { user: this.users.kate, type: this.types.work },
  ];
  private recentUsers: RecentUsers[]  = [
    { user: this.users.alan, type: this.types.home, time: this.time.setHours(21, 12)},
    { user: this.users.eva, type: this.types.home, time: this.time.setHours(17, 45)},
    { user: this.users.nick, type: this.types.mobile, time: this.time.setHours(5, 29)},
    { user: this.users.lee, type: this.types.mobile, time: this.time.setHours(11, 24)},
    { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(10, 45)},
    { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 42)},
    { user: this.users.kate, type: this.types.work, time: this.time.setHours(9, 31)},
    { user: this.users.jack, type: this.types.mobile, time: this.time.setHours(8, 0)},
  ];

  constructor(public api: ApiService) {
    super();
  }

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }

  getCurrentUser(): Observable<any> {
    new BehaviorSubject(JSON.parse(localStorage.getItem('__USER') || '{}')).subscribe((data) => {
      this.currentUser = data;
      UserService.currentStaticUser = data;
    });
    this.currentUserCode = this.currentUser.user.code;
    this.role_code = this.currentUser.employee.role_code;
    this.role_name = this.currentUser.employee.role_name;
    return observableOf(this.currentUser);
  }
  
/**
   * get employee list
   */
  getAllEmployee(): Observable<any> {
    return this.api.get('employee' , {}, {});
  }
  /**
   * get pending orders
   */
  public getCustomerWarehouse(customerCode:string): Observable<any> {
    return this.api.get('customer/' + customerCode + '/warehouse', {}, {});
  }

  /**
   * get customer data
   */
  public getCustomerData(customerCode:string): Observable<any> {
    return this.api.get('customer/' + customerCode, {}, {});
  }

  // getCustomerWarehouseSku

  public getCustomerWarehouseSku(customerCode:string, warehouseCode:string,userCode:string): Observable<any> {
    return this.api.get(`customer/${customerCode}/warehouse/${warehouseCode}/sku/${userCode}`, {}, {});
  }

  /**
   * get warehouse wise sku
   */
  public getWarehouseWiseSKU(warehouseCode:string,user_code:string): Observable<any> {
    return this.api.get(`warehouse/${warehouseCode}/sku/${user_code}`, {}, {});
  }

  public downloadSkuData(warehouseCode:string,userCode:string,isDownload:boolean):Observable<any>{
    return this.api.get(`warehouse/${warehouseCode}/sku/${userCode}/${isDownload}`);
  }
}
