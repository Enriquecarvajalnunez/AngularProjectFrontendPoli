import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicio, ServicioResponse } from '../../../shared/interfaces/services.interface';
import { ServicioService } from '../../../services/servicios-service';
import { ProductService } from '../../data-access/servicios.service';
import { ServiciosStateService } from '../../data-access/servicios-state.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [ServiciosStateService, ProductService],
})
export class AdminComponent implements OnInit {
 serviciosForm: FormGroup;
 servicioService: ServicioService;
 servicesState = inject(ServiciosStateService);
 productService = inject(ProductService);
 servicios: Servicio[] = []; 
 isEditMode: boolean = false;
 editingServiceId: string | null = null;
 currentEditingService: Servicio | null = null;
 isLoading: boolean = false;
 errorMessage: string = '';

  constructor(private fb: FormBuilder, servicioService: ServicioService) {
    this.servicioService = servicioService;
    this.serviciosForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('^[0-9]*\\.?[0-9]+$')]],
      imagen: [null, [Validators.required]]
    });
  }
  
   ngOnInit(): void {
    this.loadServicios();
  }

  onlyNumbers(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      input.value = parts[0] + '.' + parts.slice(1).join('');
    } else {
      input.value = numericValue;
    }
  }

  async guardar() {
   if (this.serviciosForm.valid) {
         const serviceRequest: Servicio = this.serviciosForm.value;
         
         if (this.isEditMode && this.editingServiceId !== null) {
           this.servicioService.updateServicio(this.editingServiceId, serviceRequest).subscribe({
             next: (response: ServicioResponse) => {
                if(response.success){
                  console.log(response.message);
                  this.serviciosForm.reset();
                  this.resetEditMode();
                  this.loadServicios();
                }
             },
             error: (error) => {
               console.error('Image update failed', error);
             }
           });
         } else {
           // Crear nueva imagen
           this.servicioService.saveServicio(serviceRequest).subscribe({
             next: (response: ServicioResponse) => {
                if(response.success){
                  console.log(response.message);
                  this.serviciosForm.reset();
                  this.loadServicios();
                }
             },
             error: (error) => {
               console.error('Image save failed', error);
             }
           });
         }
       } else {
         console.log('Form is invalid', this.serviciosForm.errors);
         this.markFormGroupTouched();
       }
  }

  loadServicios(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Usamos directamente el ProductService para evitar problemas con imágenes grandes
    this.loadServiciosDirectly();
  }

  private loadServiciosDirectly(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.productService.getServices(1).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        this.isLoading = false;
        
        if (error.status === 431) {
          this.errorMessage = 'Error: Las imágenes son demasiado grandes para cargar. El servidor no puede procesar la petición.';
          console.error('Request Header Fields Too Large - Las imágenes base64 son demasiado grandes');
        } else {
          this.errorMessage = `Error al cargar los servicios: ${error.message || 'Error desconocido'}`;
        }
        
        return of([]); // Retorna array vacío en caso de error
      })
    ).subscribe({
      next: (servicios: Servicio[]) => {
        this.servicios = servicios;
        this.isLoading = false;
      }
    });
  }

  editService(service: Servicio): void {
    this.isEditMode = true;
    this.editingServiceId = service.id;
    this.currentEditingService= service;
    
    // Make image field optional during edit mode
    this.serviciosForm.get('imagen')?.clearValidators();
    this.serviciosForm.get('imagen')?.updateValueAndValidity();
    
    this.serviciosForm.patchValue({
      id: service.id,
      nombre: service.nombre,
      descripcion: service.descripcion,
      precio: service.precio
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteImage(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      this.servicioService.deleteServicio(id).subscribe({
        next: (response: ServicioResponse) => {
          if(response.success) {
            console.log(response.message);
            this.loadServicios();
          }
        },
        error: (error) => {
          console.error('Image delete failed', error);
        }
      });
    }
  }

  resetEditMode(): void {
    this.isEditMode = false;
    this.editingServiceId = null;
    this.currentEditingService = null;
    
    // Restore image field as required for new entries
    this.serviciosForm.get('imagen')?.setValidators([Validators.required]);
    this.serviciosForm.get('imagen')?.updateValueAndValidity();
  }

  cancelEdit(): void {
    this.serviciosForm.reset();
    this.resetEditMode();
  }

   private markFormGroupTouched(): void {
    Object.keys(this.serviciosForm.controls).forEach(key => {
      const control = this.serviciosForm.get(key);
      control?.markAsTouched();
    });
  }

}
