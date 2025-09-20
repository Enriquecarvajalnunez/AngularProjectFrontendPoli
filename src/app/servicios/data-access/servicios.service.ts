import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseHttpServices } from "../../shared/data-access/base-http.services";
import { Observable } from "rxjs";
import { Servicio } from "../../shared/interfaces/services.interface";

const LIMIT = 5;

@Injectable()
export class ProductService extends BaseHttpServices{     
    getServices(page: number):Observable<Servicio[]>{
        return this.http.get<any[]>(`${this.apiUrl}`,{
            params:{
                page: page,
                limit: LIMIT, //SIEMPRE 5
            }
        });
    }

    getService(id: number): Observable<Servicio>{
        return this.http.get<Servicio>(`${this.apiUrl}/Servicios/${id}`);
    }
}