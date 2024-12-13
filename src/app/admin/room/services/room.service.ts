import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiUrl = environment.apiUrl + "/api/v1/room";
  constructor(private http: HttpClient) { }
  createRoom(room): any {
    return this.http.post(this.apiUrl, room);
  }
  getRooms(): any {
    return this.http.get(this.apiUrl);
  }
  deleteRoom(id: number): any {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateRoom(room): any {
    return this.http.put(`${this.apiUrl}/${room.id}`, room);
  }
  getRoom(id: number): any {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
