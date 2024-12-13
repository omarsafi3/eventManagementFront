import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';  // Initialize error message

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    // Initialize the FormGroup using FormBuilder
    this.loginForm = this.fb.group({
      username: ['', Validators.required],  // Add form controls with validation
      password: ['', Validators.required]    // Add password control
    });
  }
  onRegister() {
    this.router.navigate(['/register']);  // Redirect to register page
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.loginService.login(user).subscribe(
      (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);  // Store token in localStorage
          // Extract roles from authorities array
          this.loginService.getRoles().subscribe(
            (res: any) => {
              console.log(res);
              if (res.roles) {
                localStorage.setItem('roles', res.roles);  // Store roles in localStorage
                localStorage.setItem('username', res.fullName);  // Store username in localStorage
                if (res.roles === ('ADMIN')) {
                  this.router.navigate(['/admin/dashboard']);  // Redirect to admin dashboard
                }
              }
            }
          );
        }
      },
      (error) => {
        this.loginError = error?.error?.message || 'An error occurred. Please try again.';
      }
    );
    
  }
}
