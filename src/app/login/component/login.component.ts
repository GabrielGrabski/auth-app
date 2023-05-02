import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserRequest } from '../interface/user-request';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage!: string;;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const user = this.loginForm.getRawValue() as UserRequest;

    if (this.loginForm.valid) {
      this.setLocalStorageTokenAndRedirect(user);
    }
  }

  setLocalStorageTokenAndRedirect(user: UserRequest): void {
    this.service.login(user).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['home']);
      },
      error: (err) => this.errorMessage = err.error.message,
    });
  }
}
