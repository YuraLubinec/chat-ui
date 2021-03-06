import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { UserService } from '../services/user.service'
import { User } from '../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {

  private operationIsSuccess: boolean;
  private display: string = 'password';
  private registrationForm: FormGroup;
  private roles: Array<any>;
  private serverValidationError: string;
  private users: Array<User>;
  private subscription: any;


  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private userService: UserService) { }

  ngOnInit() {

    this.userService.getAllUsers().subscribe(data => this.users = data.json() as Array<User>);
    this.registrationService.getAvailableRoles().subscribe(response => this.roles = response.json());
    this.createEmptyForm();
  }

  createEmptyForm() {

    this.registrationForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern('[a-zA-z]*'), Validators.minLength(4), Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      role: [null, [Validators.required]],
      fullName: [null, [Validators.required, Validators.pattern('([а-яА-Я]|[єюїіЄЮЇІ])+\\s([а-яА-Я]|[єюїіЄЮЇІ])+'), Validators.maxLength(25)]],
    })
  }

  onSubmit() {

    this.serverValidationError = null;
    this.registrationService.registerNewUser(
      new User(this.registrationForm.value.username, this.registrationForm.value.password,
        this.registrationForm.value.role, this.registrationForm.value.fullName))
      .then(() => { this.createEmptyForm(); this.refreshUsers(); this.operationIsSuccess = true; setTimeout(() => this.operationIsSuccess = false, 5000); this.users = this.subscription.getAllUsers() }).catch((error) => this.handleError(error))
  }

  refreshUsers() {

    this.userService.getAllUsers().subscribe(data => this.users = data.json() as Array<User>);
  }

  delete(id: string) {

    let result = confirm("Ви впевнені що хочете видали користувача?");
    if (result) {
      console.log(id);
      this.userService.deleteUser(id);
      this.users = this.users.filter(user => user.id != id);
    }
  }

  handleError(error: any) {

    if (error.status == 400) {
      this.serverValidationError = error._body;
    }
    else {
      this.serverValidationError == 'Сталася невідома помилка' + error.status;
    }

  }

  displayPassword(checked: boolean) {

    if (checked) {
      this.display = 'text';
    }
    else {
      this.display = 'password';
    }
  }

}
