import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { User } from '../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {

  private registrationForm: FormGroup;
  private roles: Array<any>;


  constructor(private fb: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit() {
    
    this.registrationService.getAvailableRoles().subscribe(response => this.roles = response.json());
    this.createEmptyForm();

  }

  createEmptyForm() {

    this.registrationForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern('[a-zA-z]*'), Validators.minLength(4), Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      role: [null , [Validators.required]],
      fullName: [null, [Validators.required, Validators.maxLength(20)]],
    })
  }

  onSubmit() {
    this.registrationService.registerNewUser(
      new User(this.registrationForm.value.username, this.registrationForm.value.password,
        this.registrationForm.value.role, this.registrationForm.value.fullName))
      .then(() => this.createEmptyForm()).catch(this.handleError)
  }

  handleError(error: any) {
    console.log('sraka');
  }

}
