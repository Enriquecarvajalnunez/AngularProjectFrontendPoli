import { HttpClient } from "@angular/common/http";
import { Injectable,inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class BaseHttpServices {
    http = inject(HttpClient);
    apiUrl = environment.API_URL;  
}