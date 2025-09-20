import { Component, input } from '@angular/core';
import { Servicio } from '../../../shared/interfaces/services.interface';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './service-card.component.html',
  styles: ``
})
export class ServiceCardComponent {
  service = input.required<Servicio>();
}
