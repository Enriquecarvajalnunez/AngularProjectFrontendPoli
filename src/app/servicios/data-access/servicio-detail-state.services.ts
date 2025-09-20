import { computed, inject, Injectable } from "@angular/core";
import { Servicio } from "../../shared/interfaces/services.interface";
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from "./servicios.service";
import { map, switchMap } from 'rxjs/operators';
import { Observable } from "rxjs";

interface State {
    servicio: Servicio | null;
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ServicioDetailStateService {
    private productService = inject(ProductService);

    private initialState: State = {
        servicio: null,
        status: 'loading',
    };

    state = signalSlice({
        initialState: this.initialState,
        actionSources: {
            getById: (_state, $: Observable<string>) => $.pipe(
                switchMap(id => this.productService.getService(id)),
                map(data => ({                                         
                    servicio: data, 
                    status: 'success' as const                 
                })),
            )
        }
    });

    // ✅ Usa nombres distintos para las señales
    servicioSignal = computed(() => this.state().servicio);
    statusSignal   = computed(() => this.state().status);
}
