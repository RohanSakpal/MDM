import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { MenuModel } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  standalone: true,
  imports: [CommonModule,FormsModule,MatListModule,MatIconModule],
  templateUrl: './menu-list-item.component.html',
  styleUrl: './menu-list-item.component.scss',
  animations: [
    trigger('rotateAnimation', [
      state('expanded', style({ transform: 'rotate(180deg)' })),
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      transition('expanded <=> collapsed', animate('200ms ease-in-out'))
    ])
  ]
})
export class MenuListItemComponent {
  expanded!:boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: MenuModel;
  @Input() depth!:number;
  @Input() showLeftNav:boolean = true;

  constructor(private navService:NavService, public router:Router) {
    if(this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: MenuModel) {   
    if(!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    }
    if(item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
