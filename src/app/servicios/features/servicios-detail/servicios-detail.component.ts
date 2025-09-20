import { Component, input, effect, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDetailStateService } from '../../data-access/servicio-detail-state.services';
import { from } from 'rxjs';

@Component({
  selector: 'app-servicios-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios-detail.component.html',
  providers: [ServicioDetailStateService]
})
export default class ServiciosDetailComponent {
  
  // Inyectamos el servicio completo
  private servicioDetailStateService = inject(ServicioDetailStateService);

  // Input requerido
  id = input.required<string>();

  // Computed para acceder a las señales del servicio
  servicio = computed(() => this.servicioDetailStateService.servicioSignal());
  status   = computed(() => this.servicioDetailStateService.statusSignal());

    constructor() {
      // Efecto para cargar el servicio por ID
      effect(() => {
        const idValue = this.id();
        if (idValue) {
          this.servicioDetailStateService.state.getById(from([idValue]));
        }      
      }, { allowSignalWrites: true }
    
    );     
  }  
}
