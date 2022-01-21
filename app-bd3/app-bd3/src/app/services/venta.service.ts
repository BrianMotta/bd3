import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url='http://localhost:3000/ventas/milistaventas';
  urlCanasta='http://localhost:3000/transaccion/compraproductoscanasta';
  urlCompras='http://localhost:3000/ventas/milistacompras';
  
  constructor(private http:HttpClient) { }

  miListaVentas(idVendedor:string): Observable <any>{
    const params=new HttpParams().set('idVendedor',idVendedor);
    return this.http.get(this.url,{params:params});
  }

  compraCanasta(canasta:Producto[]): Observable <any>{
    return this.http.post(this.urlCanasta,canasta);
  }

  miListaCompras(idVendedor:string): Observable <any>{
    const params=new HttpParams().set('idVendedor',idVendedor);
    return this.http.get(this.urlCompras,{params:params});
  }
}
