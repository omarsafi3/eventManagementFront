import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; 
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiUrl + '/api/v1';
  constructor(private http: HttpClient) {
   }
  login(user: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, user);
  }
  getUser(email: string) {
    return this.http.get<any>(`${this.apiUrl}/participant/email/${email}`);
  }
  getRoles() {
    return this.http.get<any>(`${this.apiUrl}/auth/me`);  // Assuming this endpoint provides user info with roles
  }
  logout() {
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('roles');  // Remove roles from localStorage
  }
}
