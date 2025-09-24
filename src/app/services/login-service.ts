import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginRequest, LoginResponse } from '../shared/interfaces/login.interfaces';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {}

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        const apiUrl = `${environment.API_URL}/login`;
       // return this.http.post<LoginResponse>(apiUrl, loginRequest);
       //para modo prueba sin api login
       return new Observable(observer => {
           observer.next({ message: 'Login successful', success: true });
           observer.complete();
       });
    }
}