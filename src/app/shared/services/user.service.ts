import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = "http://localhost:3000/users";
  

  constructor(private http: HttpClient) { }


  createAccount(user: any): Observable<any> {
    return this.http.post(this.BASE_URL, user);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }

  updateUserById(id: number, user: any) {
    return this.http.put(`${this.BASE_URL}/${id}`, user);
  }

   getAdminMenu(){
    return this.http.get("assets/json/admin.menu.json");
   }
}
