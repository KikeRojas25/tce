
export interface Manifiesto
{
    id?: string;
    manifiesto_id?: number;
    title?: string;
    content?: string;
    image?: string | null;
    archived?: boolean;
    createdAt?: string;
    updatedAt?: string | null;
    numero_manifiesto?: string;
    fecha_salida?: Date;
    destino?: string;
    valorizado?: number;
    placas?: string;
    estado_id?: number;



    bejaranopucallpa?: number;
    estiba?: number;
    adicionales?: number;
    transbordos?: number;
    otros?: number;
    kmrecorridos?: number;
    costotercero?: number;
    fluvial?: number;
    oriental?: number;
    estiba_adicional?: number;
    otrosgastos?: number;
    otrosgastos2?: number;
    otrosgastos3?: number;
    otrosgastos4?: number;
    


    facturado?: boolean;
    adicional_facturado?: boolean;
    retorno_facturado?: boolean;
    sobreestadia_facturado?: boolean;
    estiba_facturado?: boolean;
    costotercero_facturado?: boolean;
    oriental_facturado?: boolean;
    bejaranoiquitos?: boolean;
    bejarano_iquitos_facturado?: boolean;
    bejarano_pucallpa_facturado?: boolean;
    estibaadicional_facturado?:boolean;
    fluvial_facturado?: boolean;
    otrosgastos_facturado?: boolean;
    otrosgastos2_facturado?: boolean;
    otrosgastos3_facturado?: boolean;
    otrosgastos4_facturado?: boolean;



    fecha_facturado?: Date;
    fecha_adicional_facturado?: Date;
    fecha_sobreestadia_facturado?: Date;
    fecha_retorno_facturado?: Date;
    estiba_fecha?: Date;
    estibaadicional_fecha?: Date;
    bejarano_pucallpa_fecha?: Date;
    bejarano_iquitos_fecha?: Date;
    oriental_fecha?: Date;
    fluvial_fecha?: Date;
    costotercero_fecha?: Date;
    otrosgastos_fecha?: Date;
    otrosgastos2_fecha?: Date;
    otrosgastos3_fecha?: Date;
    otrosgastos4_fecha?: Date;


    numServicio?: string;
    numAdicional?: string;
    numSobreestadia?: string;
    numRetorno?: string;
    estiba_numerodoc?: string;
    fluvial_numerodoc?: string;
    oriental_numerodoc?: string;
    costotercero_numerodoc?: string;
    bejarano_iquitos_numerodoc?: string;
    bejarano_pucallpa_numerodoc?: string;
    estibaadicional_numerodoc?: string;
    otrosgastos_numerodoc?: string;
    otrosgastos2_numerodoc?: string;
    otrosgastos3_numerodoc?: string;
    otrosgastos4_numerodoc?: string;
 

}

export interface Cliente {
    id: number;
    razon_social: string;
    ruc?: string;

}

export interface ValorTabla {
    id: any;
    valorPrincipal: string;
}

export interface Grupo {
    id: any;
    nombre: string;
}