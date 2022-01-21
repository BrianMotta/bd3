import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url1 = 'http://localhost:3000/usuarios/miusuario';
  urlCrearUsuario = 'http://localhost:3000/usuarios/agregarusuario';
  urlUsuarios = 'http://localhost:3000/usuarios';
  urlVerPerfil = 'http://localhost:3000/usuarios/verperfil';
  urlEliminarUsuario = 'http://localhost:3000/transaccion/eliminarusuario';

  constructor(private http: HttpClient) { }

  miUsuario(ruc: string): Observable<any> {
    const params = new HttpParams().set('ruc', ruc);
    return this.http.get(this.url1, { params: params });
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.urlCrearUsuario, usuario);
  }

  usuarios(): Observable<any> {
    return this.http.get(this.urlUsuarios);
  }

  verPerfil(ruc: string): Observable<any> {
    const params = new HttpParams().set('ruc', ruc);
    return this.http.get(this.urlVerPerfil, { params: params });
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(this.urlEliminarUsuario, { body: { 'id': id } });
  }

}
