import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { LoginUser } from '../models/loginUser'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorOccured: Boolean;
  unexpectedErrorOccured: Boolean;
  authenticationErrorMessage = 'Неправильний логін або пароль';
  defaultErrorMessage = 'Сталася невідома помилка, спробуйте пізніше';

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    
    this.createEmptyForm();
  }

  createEmptyForm() {

    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    })
  }

  onSubmit() {

    this.errorOccured = false;
    this.unexpectedErrorOccured = false;
    let loginUser : LoginUser =  new LoginUser(this.loginForm.value.username, this.loginForm.value.password);
    this.authenticationService.login(loginUser)
      .then(() => this.loginForm.reset())
      .catch(status => this.authenticationErrorHandler(status));
  }

  private authenticationErrorHandler(status: Number) {

    if (status === 401) { this.errorOccured = true }
    else { console.log('Error occured, status: ' + status), this.unexpectedErrorOccured = true }
  }

}
