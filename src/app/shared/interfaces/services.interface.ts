export interface Servicio {
    id: string,
    descripcion: string;
    imagenBase64: File | string | null;
    nombre: string;
    precio: number;
}

export interface ServicioResponse {
    message: string;
    success: boolean;
}