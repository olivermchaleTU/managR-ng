import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginModel } from 'src/app/utils/types/AuthTypes';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
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

  initialiseForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  submit() {
    this.loading = true;

    const loginDetails: LoginModel = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };

    this.authService.login(loginDetails).subscribe(
      resp => this.handleLoginSuccess(),
      err => this.handleLoginFailure()
    );
  }

  handleLoginSuccess() {
    this.loading = false;
    this.router.navigate(['/board']);
  }

  handleLoginFailure() {
    this.loading = false;
    Swal.fire({
      title: 'Login Failed!',
      text: 'Invalid Username or Password',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

}
