import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../services/user.service';
import { MasterService } from '../../../services/master.service';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent implements OnInit {
  datasource: any;
  displayedColumns: string[] = ['code', 'name', 'state', 'status', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentUserCode: string = '';
  loadState: any[] = [];

  constructor(private userService: UserService,
    private masterDataService: MasterService,
  ) {

  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((resp: any) => {
      this.currentUserCode = resp.user.code;
    });
    this.getAllState();
    this.loadCity();
  }

  getAllState() {
    this.masterDataService.getAllMaster('state').subscribe((response: any) => {
      if (response.status_code === '200') {
        this.loadState = response.data;
      } else {
        console.log('Some problem in fetching cities.', 'Failed!');
      }
    });
  }

  loadCity() {
    this.masterDataService.getAllMaster('city').subscribe((response: any) => {
      if (response.status_code === '200') {
        this.datasource = new MatTableDataSource<any>(response.data);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        // this.cdr.detectChanges();
      } else {
        console.log('Some problem in fetching cities.', 'Failed!');
      }
    });
  }

  functionAdd() {

  }

  FunctionEdit(id: any) {

  }
  FunctionDelete(id: any) {

  }
}
