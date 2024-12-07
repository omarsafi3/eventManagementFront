import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');  // Check if token exists

    if (!token) {
      // If no token exists, redirect to login page
      this.router.navigate(['/login']);
      return false;  // Block access to the route
    }

    return true;  // Allow access to protected routes if token exists
  }
}
