import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  urlVerificarUsuario='http://localhost:3000/usuarios/verificarusuario';

  constructor(private http:HttpClient ) {}

  verificarUsuario(nombre:string,clave:string):Observable<any>{
    const params=new HttpParams().set('usuario',nombre).set('clave',clave);
    return this.http.get(this.urlVerificarUsuario,{params:params});
  }

}
