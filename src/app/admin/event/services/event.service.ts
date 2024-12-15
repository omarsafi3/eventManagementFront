import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiUrl = environment.apiUrl + "/api/v1/events"
  staffMembersUrl = environment.apiUrl + "/api/v1/staffmembers"
  clientUrl = environment.apiUrl + "/api/v1/clients"
  availableRoomsUrl = environment.apiUrl + "/api/v1/room/available-rooms"
  constructor(private http : HttpClient) {}

  getEvents() {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  
  create(event: any) {
    return this.http.post(`${this.apiUrl}`, event);
  }

  getStaffMembers() {
    return this.http.get<any>(`${this.staffMembersUrl}`);
  }
  getClients() {
    return this.http.get<any>(`${this.clientUrl}`);
  }
  getClient(id: number) {
    return this.http.get<any>(`${this.clientUrl}/${id}`);
  }
  getStaff(id: number) {
    return this.http.get<any>(`${this.staffMembersUrl}/${id}`);
  }
  getMaterial(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  deleteEvent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getAvailableRooms(start: string, end: string, day: string) {
    const params = { start, end, day }; // Query parameters
    return this.http.get<any>(`${this.availableRoomsUrl}`, { params });
  }
  
  
}
