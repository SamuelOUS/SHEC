import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/login-response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){}


  userSignal = signal<User>({name:'', password:'', email:''});

  login(email: string, password: string) : Observable<LoginResponse>{
    const body = {
      email,
      password
    }
    return this.http.post<UserResponse>('http://localhost:3000/api/users/login', body).pipe(
      tap(response=>{
        this.setUser(response);
        sessionStorage.setItem('token', response.token);

      }),
      map(()=>{return {success:true}})
      
    );
  }

  logout(){
    localStorage.removeItem('loggedUser');
    sessionStorage.clear();
    this.userSignal.set({name:'', password:'', email:''});
  }

  register(user:User): Observable<SignUpResponse>{
    return this.http.post<UserResponse>('http://localhost:3000/api/users', user).pipe(
      tap(response=>{
        this.setUser(response);
        sessionStorage.setItem('token', response.token);

      }),
      map(()=>{return {success:true}})
    )
  }

  private setUser(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }

  getUser(){
    const userSrt = localStorage.getItem('loggedUser');
    if(userSrt){
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }

}