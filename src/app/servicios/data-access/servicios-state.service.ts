import { inject, Injectable, signal } from "@angular/core";
import { Servicio } from "../../shared/interfaces/services.interface";
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductService } from "./servicios.service";
import { map, startWith, switchMap } from 'rxjs/operators';
import { Subject } from "rxjs";

const LIMIT = 8;

interface State {
    servicios: Servicio[];
    status: 'loading' | 'success' | 'error';
    page: number;
}

@Injectable()
export class ServiciosStateService {
    private productService = inject(ProductService);

    private initialState: State = {
        servicios: [],
        status: 'loading' as const, 
        page: 1,       
  };

  changePage$ = new Subject<number>();
    // observable flujo que carga los servicios según la página
  loadServices$ = this.changePage$.pipe(
    startWith(1),
    switchMap((page) =>
      this.productService.getServices(1).pipe( // API siempre devuelve todos
        map((allServicios) => {
          const totalPages = Math.ceil(allServicios.length / LIMIT);

          //lógica de paginación circular
          let currentPage = page;
          if (page > totalPages) {
            currentPage = 1; // si pasa del último, vuelve al primero
          } else if (page < 1) {
            currentPage = totalPages; // si baja del primero, va al último
          }

          return {
            servicios: allServicios.slice(
              (currentPage - 1) * LIMIT,
              currentPage * LIMIT
            ),
            status: 'success' as const,
            page: currentPage,
          };
        })
      )
    )
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadServices$],
  });

  //helpers para usar en tu componente servicios-list.component
  nextPage(currentPage: number) {
    this.changePage$.next(currentPage + 1);
  }

  prevPage(currentPage: number) {
    this.changePage$.next(currentPage - 1);
  }
}