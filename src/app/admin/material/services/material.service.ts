import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment'; 
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  apiUrl = environment.apiUrl + '/api/v1/material';
  constructor(private http: HttpClient) { }
  getMaterials() {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  addMaterial(material: any) {
    return this.http.post(`${this.apiUrl}`, material);
  }
  getMaterialById(id: any) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateMaterial(material: any) {
    return this.http.put(`${this.apiUrl}/${material.id}`, material);
  }
  deleteMaterial(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
