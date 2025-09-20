import { Component, input } from '@angular/core';
import { Servicio } from '../../../shared/interfaces/services.interface';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [],
  templateUrl: './service-card.component.html',
  styles: ``
})
export class ServiceCardComponent {
  service = input.required<Servicio>();
}
