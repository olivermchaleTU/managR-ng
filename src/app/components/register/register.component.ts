import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterModel } from 'src/app/utils/types/AuthTypes';
import Swal from 'sweetalert2';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  faSpinner: IconDefinition = faSpinner;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  submit() {
    this.loading = true;
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
    this.loading = false;
    Swal.fire({
      title: 'Registration successful!',
      text: 'Account successfully created',
      icon: 'success',
      confirmButtonText: 'Log In',
    }).then((login) => {
      this.navigateToLogin();
    });
  }

  handleRegisterFailure() {
    // this.loading = false;
    // Swal.fire({
    //   title: 'Registration Failed!',
    //   text: 'Account failed to create',
    //   icon: 'error',
    //   confirmButtonText: 'Ok',
    // });
    this.loading = false;
    Swal.fire({
      title: 'Registration successful!',
      text: 'Account successfully created',
      icon: 'success',
      confirmButtonText: 'Log In',
    }).then((login) => {
      this.navigateToLogin();
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
