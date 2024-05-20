import { Observable } from 'rxjs';

export interface User {
  name: string;
  picture: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export interface CurrentUser extends User {
  user: {
    _id: number,
    code: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    date_of_birth: string,
    image_url: string,
    status_code: number,
    mobile_number: number,
  };
  employee: {
    code: number,
    role_code: number,
    role_name: string,
    reporting_1_employee_code: string,
    reporting_2_employee_code: string,
  };
}

export abstract class UserData {
  abstract getUsers(): Observable<User[]>;
  abstract getContacts(): Observable<Contacts[]>;
  abstract getRecentUsers(): Observable<RecentUsers[]>;
  abstract getCurrentUser(): Observable<CurrentUser[]>;
}
