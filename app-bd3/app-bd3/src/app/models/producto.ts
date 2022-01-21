export class Producto{
    //
    _id?:number;
    
    nombre?: string;

    categoria?: string ;

    descripcion?: string ;

    precio?:number;

    unidadDeMedida?:string;

    //
    puntuacionTotal?: Number;
    
    //
    votacionTotal?:Number;
    
    //
    comentarios?:[{cuerpo:string , fecha:Date}]; 
    
    idVendedor?:string ; 

    nombreVendedor?:string;
    
    calificacion?:number;
    
    constructor(){}
}