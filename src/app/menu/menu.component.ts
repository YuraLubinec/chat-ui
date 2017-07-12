import { Component, OnInit, Input } from '@angular/core';
import { AuthenticatedUser } from '../models/authenticatedUser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() userRole: String;

  constructor() {

  }

  ngOnInit() {

  }

  getUserRole() {
    return sessionStorage.getItem('currentChatUserRole');
  }

}
