import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = environment.apiUrl + '/api/v1/category';
  
  constructor(private http : HttpClient) { }
  getCategories() {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  createCategory(category: any) {
    return this.http.post(`${this.apiUrl}`, category);
  }
  updateCategory(category: any) {
    return this.http.put(`${this.apiUrl}/${category.id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
