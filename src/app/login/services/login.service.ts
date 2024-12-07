import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; 
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiUrl + '/api/v1/auth';
  constructor(private http: HttpClient) {
   }
  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  getRoles() {
    return this.http.get<any>(`${this.apiUrl}/me`);  // Assuming this endpoint provides user info with roles
  }
  logout() {
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('roles');  // Remove roles from localStorage
  }
}
