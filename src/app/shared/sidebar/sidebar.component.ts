import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay, filter } from 'rxjs';
import { NavService } from '../../services/nav.service';

export interface MenuModel {
  menuId: string;
  displayName: string;
  route: string;
  children: MenuModel[];
}


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatMenuModule, MatListModule, MatToolbarModule, MatIconModule, 
    RouterOutlet, MenuListItemComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('appDrawer') appDrawer!: ElementRef;
  version = VERSION;
  showLeftNav: boolean = true;
  menuModel: MenuModel[] = [
    {
      menuId: "1",
      displayName: 'Master',
      route: '/master',
      children: [
        {
          menuId: "1.1",
          displayName: 'Base Master',
          route: '/dashboard/master/base-master',
          children: [
            {
              menuId: "1.1.1",
              displayName: 'City Master',
              route: '/dashboard/master/base-master/city',
              children: []
            },
            {
              menuId: "1.1.2",
              displayName: 'State Master',
              route: '/dashboard/master/base-master/state',
              children: []
            }
          ]
        },
        {
          menuId: "1.2",
          displayName: 'Transport Master',
          route: '/dashboard/master/transport-master',
          children: [
            {
              menuId: "1.2.1",
              displayName: 'Warehouse Master',
              route: '/dashboard/master/transport-master/warehouse',
              children: []
            },
            {
              menuId: "1.2.2",
              displayName: 'Truckload Master',
              route: '/dashboard/master/transport-master/truckload',
              children: []
            }
          ]
        },
      ]
    }
  ];
  user: any = '';

  constructor(private navService: NavService, private observer: BreakpointObserver,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.observer.observe(['(max-width:800px)', '(max-height:100%)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode == 'over') {
          this.sidenav.close();
        }
      });
  }

  showAndHideLeftNav() {
    if (this.showLeftNav) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    this.showLeftNav = !this.showLeftNav;
  }

  logout() {

  }
}
