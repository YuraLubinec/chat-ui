import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {

    this.authenticationService.checkAuthority();
  }

  getUserRole() {

    return sessionStorage.getItem('currentChatUserRole');
  }
}
