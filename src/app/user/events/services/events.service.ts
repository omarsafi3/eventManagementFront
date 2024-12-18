import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  apiUrl = environment.apiUrl + '/api/v1/events'
  clientUrl = environment.apiUrl + "/api/v1/clients"
  staffMembersUrl = environment.apiUrl + "/api/v1/staffmembers"
  constructor(private http: HttpClient) { 
  }
  getEvents() {
    return this.http.get(this.apiUrl);
  }
  getEvent(id: number) {
    return this.http.get(this.apiUrl + '/' + id);
  }
  getClients() {
    return this.http.get<any>(`${this.clientUrl}`);
  }
  getStaffMembers() {
    return this.http.get<any>(`${this.staffMembersUrl}`);
  }
  getUserId(){
    const url = environment.apiUrl + '/api/v1/auth/me'
    return this.http.get(url);
  }
  registerEvent(eventId: any ,participant:any ) {
    const participantData = {
      participant,
      amountPaid: 0
    };
    return this.http.post(`${this.apiUrl}/${eventId}/register`, participantData);
  }
}
