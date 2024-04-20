import { Injectable } from '@angular/core';
import { Personal } from '../models/personal';
import { environment } from '../environments/environments.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  base=environment.base;
  usuario:Personal | undefined; 

  getUsers(){
    return this.http.get(`${this.base}users`);
  }
  logout(){
    localStorage.removeItem('token-ope');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
  }
  login(data:any){
    return this.http.post(this.base + 'login/',data)
    .pipe(
        map((success:any)=>{
          const tokenAF= `Bearer ${success['token']}`;    
          localStorage.setItem('token-ope',tokenAF);                
          return success;
        })
    );
  }
}
