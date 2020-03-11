import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterModel } from 'src/app/utils/types/AuthTypes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.initialiseForm();
  }

  get form() {
    return this.registerForm.controls;
  }

  initialiseForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  submit() {
    const registrationInfo: RegisterModel = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      role: 1
    };

    this.authService.register(registrationInfo).subscribe(
      resp => this.handleRegisterSuccess(),
      error => this.handleRegisterFailure()
    );
  }

  handleRegisterSuccess() {
    console.log('success');
  }

  handleRegisterFailure() {
    console.error('failure');
  }

}
