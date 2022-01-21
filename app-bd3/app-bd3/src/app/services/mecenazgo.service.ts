import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mecenazgo } from '../models/mecenazgo';

@Injectable({
  providedIn: 'root'
})
export class MecenazgoService {

  url='http://localhost:3000/mecenazgo/milistamecenazgos';
  urlCrearMecenazgo='http://localhost:3000/mecenazgo/agregarmecenazgo';
  urlMecenas='http://localhost:3000/mecenazgo/milistamecenas';
  urlPerfilMecenazgo='http://localhost:3000/mecenazgo/perfilmecenazgo';

  constructor(private http:HttpClient) { }

  miListaMecenazgos(idMecenas:string): Observable <any>{
    const params=new HttpParams().set('idMecenas',idMecenas);
    return this.http.get(this.url,{params:params});
  }

  miListaMecenas(idMecenas:string): Observable <any>{
    const params=new HttpParams().set('idMecenas',idMecenas);
    return this.http.get(this.urlMecenas,{params:params});
  }
  
  perfilMecenazgo(idMecenas:string): Observable <any>{
    const params=new HttpParams().set('idMecenas',idMecenas);
    return this.http.get(this.urlPerfilMecenazgo,{params:params});
  }

  //Crea Mecenazgo
  crearMecenazgo(mecenazgo:Mecenazgo):Observable<any>{
    return this.http.post(this.urlCrearMecenazgo,mecenazgo);
  }
}
