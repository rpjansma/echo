import { AuthService } from 'src/app/core/auth/auth.service';
import {
    PlatformDetector
} from 'src/app/core/services/plataform-detector/plataform-detector.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'echo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;



  login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loading = true;

    this.authService.authenticate(username, password).subscribe(
      (data) => {
        const authToken = data.headers.get('x-access-token');
        this.userService.setToken(authToken);
        this.loading = false;
        this.router.navigate(['home']);
      },
      (error) => {
        this.loading = false;
        alert('Invalid username or password');
        console.log(error);
        this.loginForm.reset();
        this.platformDetectorService.isBrowser() &&
          this.usernameInput.nativeElement.focus();
      }
    );
  }

  isRequiredAndTouched(control: string) {
    return (
      !this.loginForm.get(control).valid && this.loginForm.get(control).touched
    );
  }

  ngOnInit(): void {
    console.log(this.isRequiredAndTouched('username'));
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private platformDetectorService: PlatformDetector,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
