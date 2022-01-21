import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  //Lista de datos
  productos: Producto[] = [];
  usuarios: Usuario[] = [];
  //Elemento a buscar
  elementoBusqueda: String = "Productos";
  //Condiciones para mostrar tablas
  displayUsuarios = "none";
  displayProductos = "initial";
  //Ruc/Dni Usuario
  id: string | null;

  constructor(private route: Router, private aRouter: ActivatedRoute, private _productoservices: ProductoService, private _usuarioservices: UsuarioService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar() {
    if (this.elementoBusqueda === "Productos") {
      this.displayProductos = "initial";
      this.displayUsuarios = "none";
      this._productoservices.productos().subscribe(
        data => {
          this.productos = data;
        },
        error => {
          console.log(error)
        }
      );
    }
    else {
      this.displayProductos = "none";
      this.displayUsuarios = "initial";
      this._usuarioservices.usuarios().subscribe(
        data => {
          this.usuarios = data;
        },
        error => {
          console.log(error)
        }
      );
    }
  };

  verPerfil(ruc: string) {
    if (ruc != this.id)
      this.route.navigate([this.id + '/ver-perfil/' + ruc]);
    else
      this.route.navigate(['/vista-usuario/' + this.id]);
  };
}
