import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Servicio, ServicioResponse } from '../shared/interfaces/services.interface';

@Injectable({
    providedIn: 'root'
})
export class ServicioService {

    constructor(private http: HttpClient) { }

    saveServicio(servicioSaveRequest: Servicio): Observable<ServicioResponse> {
        const apiUrl = `${environment.API_URL}/create`;
        return this.http.post<ServicioResponse>(apiUrl, servicioSaveRequest);
        // Mock data para desarrollo
        /*return new Observable(observer => {
            observer.next({ message: 'Servicio saved successful', success: true });
            observer.complete();
        });*/
    }

    updateServicio(id: string, servicioUpdateRequest: Servicio): Observable<ServicioResponse> {
        const apiUrl = `${environment.API_URL}/update/${id}`;
        return this.http.put<ServicioResponse>(apiUrl, servicioUpdateRequest);
        // Mock data para desarrollo
        /*return new Observable(observer => {
            observer.next({ message: 'Servicio updated successful', success: true });
            observer.complete();
        });*/
    }

    deleteServicio(id: string): Observable<ServicioResponse> {
        const apiUrl = `${environment.API_URL}/delete/${id}`;
        return this.http.delete<ServicioResponse>(apiUrl);
        // Mock data para desarrollo
        /*return new Observable(observer => {
                    observer.next({ message: 'Servicio deleted successful', success: true });
                    observer.complete();
                });*/
    }
}