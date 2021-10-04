import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
    PlatformDetector
} from '../../core/services/plataform-detector/plataform-detector.service';
import { UserService } from '../../core/services/user-service/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;
  registerForm: FormGroup;
  loading: boolean = false;

  isRequiredAndTouched(control: string) {
    return (
      !this.registerForm.get(control).valid &&
      this.registerForm.get(control).touched
    );
  }

  register() {
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    this.loading = true;
    this.userService.createUser(username, email, password).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
        this.registerForm.reset();
        this.platformDetectorService.isBrowser() &&
          this.usernameInput.nativeElement.focus();
        alert('ERROR: Try again, please.');
      }
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private platformDetectorService: PlatformDetector
  ) {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      passwordRepeat: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit(): void {}
}
