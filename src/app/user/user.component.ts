import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from "../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserDeatails().subscribe(data => this.user = data.json() as User, this.errorHandler);
  }

  errorHandler(error: any) {
    alert("Виникла помилка, спробуйте пізніше або зверніться до адміністратора");
  }

}
