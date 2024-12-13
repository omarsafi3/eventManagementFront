import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = environment.apiUrl + '/api/v1';
  constructor(private http: HttpClient) { }
  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/participants`, user);
  }
  registerAdmin(user: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
  
}
