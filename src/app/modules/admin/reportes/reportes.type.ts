
export interface ActivityResumen {
    tipooperacion: string;
    titulo: string;
    manifiestos?: string;
    entregas?: string;
    endemora?: string;
    enruta?: string;
    finalizado?: string;

}


export interface ActivityPropios {
    placa: string;
    NombreCompleto: string;
    razon_social: string;
    nombreEstado: string;
    proveedor_id: number;
}

export interface ActivityTotal {
    razon_social: string;
    total: number;
    tipo: string;
}

export interface Pie {
    value: string;
    category: string;
}
export interface ActivityTotalPendientes {
    enTransito: number;
 }