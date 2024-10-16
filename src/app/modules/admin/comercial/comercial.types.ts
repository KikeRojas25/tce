
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
    Estiba?: number;
    adicionales?: number;
    transbordos?: number;
    otros?: number;
    kmrecorridos?: number;
    costotercero?: number;
    fluvial?: number;
    oriental?: number;
    stiba_Adicional?: number;
    otrosGastos?: number;
    otrosGastos2?: number;
    otrosGastos3?: number;
    otrosGastos4?: number;
    


    facturado?: boolean;
    adicional_facturado?: boolean;
    retorno_facturado?: boolean;
    sobreestadia_facturado?: boolean;
    estiba_Facturado?: boolean;
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
    estiba_Fecha?: Date;
    estibaadicional_fecha?: Date;
    bejarano_pucallpa_fecha?: Date;
    bejarano_iquitos_fecha?: Date;
    oriental_fecha?: Date;
    fluvial_fecha?: Date;
    costoTercero_Fecha?: Date;
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


export interface OrdenTransporte {
    id?: number;
    numero_ot: string;
    shipment: string;
    delivery: string;
    destinatario: string;
    remitente: string;
    por_asignar: boolean;
    remitente_id: number;
    destinatario_id: number;
    factura: string;
    oc: string;
    guias: string;
    cantidad: number;
    volumen: number;
    peso: number;
    tiposervicio_id: number;
    distrito_carga_id: number;
    distrito_carga: string;
    direccion_carga: string;
    fecha_carga: Date;
    hora_carga: string;
    distrito_servicio: string;
    direccion_destino_servicio: string;
    fecha_salida: Date;
    hora_salida: string;
    fecha_entrega: Date;
    direccion_entrega: string;
    provincia_entrega: string;
    hora_entrega: string;
    numero_manifiesto: string;
    tracto: string;
    carreta: string;
    chofer: string;
    usuario_registro: string;
    estado_id: number;
    estado: string;
    lat_entrega: number;
    lng_entrega: number;
    nivel_satisfaccion: number;
    lat: number;
    lng: number;
    placa: string;
    lat_waypoint: number;
    lng_waypoint: number;
    orden_entrega: string;
    nombreCompleto: string;
    total: number;
    pendientes: number;
    pendiente: number;
    entregados: number;
}

export interface Incidencia {
   id: number;
   incidencia: string;
   fecha_incidencia: Date;
   observacion: string;
   usuario_registro: string ;
}

