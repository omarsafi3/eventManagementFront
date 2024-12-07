import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');  // Check if token is available

    if (token) {
      // Prevent the guard from firing a redirect again if already on the dashboard
      const roles = localStorage.getItem('roles');
      // Retrieve roles from localStorage
      if (roles?.includes('ADMIN')) {
        this.router.navigate(['/admin/dashboard']);  // Use correct path
      } else if (roles?.includes('USER')) {
        this.router.navigate(['/user-dashboard']);  // Correct redirect for user roles
      } else {
        this.router.navigate(['/dashboard']);  // Default dashboard path
      }
      return false;  // Block access to login page
    }

    return true;  // Allow access to login page if no token
  }
}

