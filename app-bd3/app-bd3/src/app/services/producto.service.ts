import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Voto } from '../models/voto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = 'http://localhost:3000/productos/milistaproductos';
  urlProductos = 'http://localhost:3000/productos';
  urlPerfilProductos = 'http://localhost:3000/productos/perfilproductos';
  urlRecomendaciones = 'http://localhost:3000/productos/recomendaciones';
  urlAgregarProducto = 'http://localhost:3000/productos/agregarmiproducto';
  urlEliminarProducto = 'http://localhost:3000/transaccion/eliminarmiproducto';
  urlModificarProducto = 'http://localhost:3000/transaccion/modificarmiproducto';
  urlProductoModificar = 'http://localhost:3000/productos/productomodificar';
  urlDetallesProducto = 'http://localhost:3000/productos/detallesproducto';
  urlAgregarComentario = 'http://localhost:3000/productos/agregarcomentario';
  urlCalificar = 'http://localhost:3000/transaccion/calificarproducto';

  constructor(private http: HttpClient) { }

  miListaProductos(idVendedor: string): Observable<any> {
    const params = new HttpParams().set('idVendedor', idVendedor);
    return this.http.get(this.url, { params: params });
  }

  perfilProductos(idVendedor: string): Observable<any> {
    const params = new HttpParams().set('idVendedor', idVendedor);
    return this.http.get(this.urlPerfilProductos, { params: params });
  }

  recomendaciones(idVendedor: string): Observable<any> {
    const params = new HttpParams().set('idVendedor', idVendedor);
    return this.http.get(this.urlRecomendaciones, { params: params });
  }


  productos(): Observable<any> {
    return this.http.get(this.urlProductos);
  }

  agregarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.urlAgregarProducto, producto);
  }

  modificarProducto(nombre: string, idVendedor: string, producto: Producto): Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("idVendedor", idVendedor);
    return this.http.put(this.urlModificarProducto, producto, { params: params });
  }

  productoModificar(nombre: string, idVendedor: string): Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("idVendedor", idVendedor);
    return this.http.get(this.urlProductoModificar, { params: params });
  }

  eliminarProducto(nombre: string, idVendedor: string): Observable<any> {
    return this.http.delete(this.urlEliminarProducto, { body: { 'nombre': nombre, 'idVendedor': idVendedor } });
  }

  detallesProducto(nombre: string, idVendedor: string): Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("idVendedor", idVendedor);
    return this.http.get(this.urlDetallesProducto, { params: params });
  }

  agregarComentario(nombre: string, idVendedor: string, cuerpo: string, fecha: Date): Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("idVendedor", idVendedor);
    return this.http.put(this.urlAgregarComentario, { comentario: { "cuerpo": cuerpo, "fecha": fecha } }, { params: params });
  }

  calificar(voto: Voto): Observable<any> {
    return this.http.post(this.urlCalificar, voto);
  }
}
