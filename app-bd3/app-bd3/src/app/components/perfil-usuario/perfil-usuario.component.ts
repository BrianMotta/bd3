import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mecenazgo } from 'src/app/models/mecenazgo';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { MecenazgoService } from 'src/app/services/mecenazgo.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  //Ruc/Dni Usuario
  id: string | null;
  //Ruc/Dni Perfil
  idPerfil: string | null;
  //Datos Perfil
  perfilUsuario: Usuario = {};
  productos: Producto[] = [];
  mecenazgos: Mecenazgo[] = [];
  //Mostrar boolean
  load: boolean;
  loadRealizarMecenazgo: boolean;
  usuarioNoExiste: boolean = false;
  loadMecenazgos: boolean = false;
  loadProductos: boolean = false;
  //Cantidad que se abona
  cantidadAbonada: number | null = null;

  constructor(private route: Router, private aRouter: ActivatedRoute, private _usuarioservices: UsuarioService, private _productoservices: ProductoService, private _mecenazgoservices: MecenazgoService) {
    //Ruc de nuestro usuario
    this.id = this.aRouter.snapshot.paramMap.get('id');
    //Ruc del perfil que vemos
    this.idPerfil = this.aRouter.snapshot.paramMap.get('idPerfil');
    //Cargar tablas
    this.load = false;
    this.loadRealizarMecenazgo = false;
    this.route.routeReuseStrategy.shouldReuseRoute = function () { return false };
  }

  ngOnInit(): void {
    this.verPerfil();
    this.verPerfilMecenazgos();
    this.verPerfilProductos();
  }

  verPerfil() {
    this.usuarioNoExiste = false;
    if (this.idPerfil != null)
      this._usuarioservices.verPerfil(this.idPerfil).subscribe(
        data => {
          this.load = true;
          this.perfilUsuario = data;
        },
        error => {
          this.usuarioNoExiste = true;
        }
      );

  }
  verPerfilProductos() {
    this.loadProductos = false
    if (this.idPerfil != null && !this.usuarioNoExiste)
      this._productoservices.perfilProductos(this.idPerfil).subscribe(
        data => {
          this.productos = data;
          this.loadProductos = true
        },
        error => {
          this.loadProductos = false
        }
      )

  }

  verPerfilMecenazgos() {
    this.loadMecenazgos = false
    if (this.idPerfil != null && !this.usuarioNoExiste)
      this._mecenazgoservices.perfilMecenazgo(this.idPerfil).subscribe(
        data => {
          this.mecenazgos = data;
          this.loadMecenazgos = true
        },
        error => {
          this.loadMecenazgos = false
        }
      )
  }

  crearMecenazgo() {
    if (this.id != null && this.idPerfil != null && this.cantidadAbonada != null) {
      const mecenazgo = { "idMecenas": this.id, "idProductor": this.idPerfil, "cantidadAbonada": this.cantidadAbonada, "fecha": new Date() };
      this._mecenazgoservices.crearMecenazgo(mecenazgo).subscribe(
        data => {
          this.cantidadAbonada = null;
          this.loadRealizarMecenazgo = false;
        },
        error => {
          console.log(error)
        }
      );
    }
  }
  realizarMecenazgo() {
    this.loadRealizarMecenazgo = true;
  }
  cancelarMecenazgo() {
    this.loadRealizarMecenazgo = false;
  }

}

