import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseHttpServices } from "../../shared/data-access/base-http.services";
import { Observable } from "rxjs";
import { Servicio } from "../../shared/interfaces/services.interface";

const LIMIT = 5;

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpServices{    
    private apiProductoUrl = 'http://localhost:5217/api/Servicios/producto'; 
    getServices(page: number):Observable<Servicio[]>{
        return this.http.get<any[]>(`${this.apiUrl}`,{
            params:{
                page: page,
                limit: LIMIT, //SIEMPRE 5
            }
        });
    }

    getService(id: string): Observable<Servicio>{
        return this.http.get<Servicio>(`${this.apiProductoUrl}/${id}`);
    }
}