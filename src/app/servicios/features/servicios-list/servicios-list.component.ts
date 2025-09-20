import { Component, inject } from '@angular/core';
import { ServiciosStateService } from '../../data-access/servicios-state.service';
import { ProductService } from '../../data-access/servicios.service';
import { ServiceCardComponent } from '../../ui/service-card/service-card.component';


@Component({
  selector: 'app-servicios-list',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './servicios-list.component.html',
  styles: ``,  
  providers: [ServiciosStateService, ProductService],
})
export default class ServiciosListComponent {  
  servicesState = inject(ServiciosStateService);
  
  changePage() {
    // usamos el método del servicio directamente
    this.servicesState.nextPage(this.servicesState.state().page);
  }
}
