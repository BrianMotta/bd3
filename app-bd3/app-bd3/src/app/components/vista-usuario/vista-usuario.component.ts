import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/models/global';
import { Mecenazgo } from 'src/app/models/mecenazgo';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { Venta } from 'src/app/models/venta';
import { MecenazgoService } from 'src/app/services/mecenazgo.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {

  //Ruc/Dni Usuario
  id: string | null;

  //Array de Datos
  usuario: Usuario = {};
  productos: Producto[] = [];
  mecenazgos: Mecenazgo[] = [];
  recomendacion: Producto[] = [];
  mecenas: Mecenazgo[] = [];
  ventas: Venta[] = [];
  compras: Venta[] = [];

  //Condiciones
  load: boolean = false;
  loadMisProductos: boolean = false;
  loadMisVentas: boolean = false;
  loadMisCompras: boolean = false;
  loadMisMecenas: boolean = false;
  loadMisMecenazgos: boolean = false;
  loadMisRecomendaciones: boolean = false;
  loadEliminarMiUsuario: boolean = false;
  loadNoSePudoEliminar: boolean = false;
  //Productos en mi canasta
  miCanasta: Producto[];
  //Cantidad en mi canasta
  cantidad: number[];

  mensajeEliminacionIncompleta: boolean = false;

  constructor(private route: Router, private _usuarioservices: UsuarioService, private aRouter: ActivatedRoute, private _productoservices: ProductoService, private _ventaservices: VentaService, private _mecenazgoservices: MecenazgoService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.miCanasta = Global.canasta;
    this.cantidad = Array(this.miCanasta.length).fill(1);
    this.load = false;
    this.loadMisProductos = false;
    this.loadMisVentas = false;
    this.loadMisCompras = false;
    this.loadMisMecenas = false;
    this.loadMisMecenazgos = false;
  }

  ngOnInit(): void {
    this.obtenerMiUsuario();
    this.obtenerMisProductos();
    this.obtenerMisRecomendaciones();
  }

  obtenerMiUsuario() {
    this.load = false;
    if (this.id != null)
      this._usuarioservices.miUsuario(this.id).subscribe(
        data => {
          this.load = true;
          this.usuario = data;
        },
        error => {
          this.load = false;
        }
      );
  }

  obtenerMisProductos() {
    if (this.id != null)
      this._productoservices.miListaProductos(this.id).subscribe(
        data => {
          this.loadMisProductos = true;
          this.loadMisVentas = false;
          this.loadMisCompras = false;
          this.loadMisMecenas = false;
          this.loadMisMecenazgos = false;
          this.productos = data;
        },
        error => {
          console.log(error)
        }
      )
  }

  obtenerMisVentas() {
    if (this.id != null)
      this._ventaservices.miListaVentas(this.id).subscribe(
        data => {
          this.loadMisVentas = true;
          this.loadMisProductos = false;
          this.loadMisCompras = false;
          this.loadMisMecenas = false;
          this.loadMisMecenazgos = false;
          this.ventas = data;
        },
        error => {
          console.log(error)
        }
      )
  }

  obtenerMisCompras() {
    if (this.id != null)
      this._ventaservices.miListaCompras(this.id).subscribe(
        data => {
          this.loadMisCompras = true;
          this.loadMisProductos = false;
          this.loadMisVentas = false;
          this.loadMisMecenas = false;
          this.loadMisMecenazgos = false;
          this.compras = data;
        },
        error => {
          console.log(error)
        }
      )
  }

  obtenerMisMecenazgos() {
    if (this.id != null)
      this._mecenazgoservices.miListaMecenazgos(this.id).subscribe(
        data => {
          this.loadMisMecenazgos = true;
          this.loadMisProductos = false;
          this.loadMisVentas = false;
          this.loadMisCompras = false;
          this.loadMisMecenas = false;
          this.mecenazgos = data;
        },
        error => {
          console.log(error)
        }
      )
  }

  obtenerMisMecenas() {
    if (this.id != null)
      this._mecenazgoservices.miListaMecenas(this.id).subscribe(
        data => {
          this.loadMisMecenas = true;
          this.loadMisProductos = false;
          this.loadMisVentas = false;
          this.loadMisCompras = false;
          this.loadMisMecenazgos = false;
          this.mecenas = data;
        },
        error => {
          console.log(error)
        }
      )
  }

  obtenerMisRecomendaciones() {
    this.loadMisRecomendaciones = false;
    if (this.id != null)
      this._productoservices.recomendaciones(this.id).subscribe(
        data => {
          this.recomendacion = data;
          if (this.recomendacion.length > 0)
            this.loadMisRecomendaciones = true;
        },
        error => {
          this.loadMisRecomendaciones = false;
        }
      )
  }

  eliminarMiProducto(nombre: string) {
    this.mensajeEliminacionIncompleta = false;
    if (this.id != null && this.load)
      this._productoservices.eliminarProducto(nombre, this.id).subscribe(
        data => {
          this.obtenerMisProductos();
        },
        error => {
          this.mensajeEliminacionIncompleta = true;
        }
      )
  }



  eliminarDeCanasta(index: number) {

    if (this.id != null) {
      console.log(this.cantidad.splice(index, 1));
      console.log(this.miCanasta.splice(index, 1));
    }

  }

  aumentarCantidad(index: number) {
    if (this.id != null)
      this.cantidad[index] = this.cantidad[index] + 1;
  }

  disminuirCantidad(index: number) {
    if (this.id != null && this.cantidad[index] > 1)
      this.cantidad[index] = this.cantidad[index] - 1;
  }

  vaciarCanasta() {
    var index = 0;
    var canastaCompra: Venta[] = [];
    if (this.id != null) {
      while (index < this.miCanasta.length) {
        var precio = this.miCanasta[index].precio;
        if (precio != undefined)
          canastaCompra.push({ "idComprador": this.id, "idVendedor": this.miCanasta[index].idVendedor, "cantidad": this.cantidad[index], "fecha": new Date(), "nombreProducto": this.miCanasta[index].nombre, "precio": precio * this.cantidad[index] })
        index++;
      }
      this._ventaservices.compraCanasta(canastaCompra).subscribe(
        data => {
          this.miCanasta = [];
          Global.canasta = [];
        },
        error => {
          console.log(error)
        }
      );
    }

  }

  salir() {
    Global.canasta = [];
    this.route.navigate(['']);
  }

  eliminarMiUsuario() {
    this.loadEliminarMiUsuario = true;
  }

  continuarEliminarMiUsuario() {
    this.loadNoSePudoEliminar = false;
    if (this.id != null)
      this._usuarioservices.eliminarUsuario(this.id).subscribe(
        data => {
          this.route.navigate(['']);
        },
        error => {
          this.loadNoSePudoEliminar = true;
        }
      )
  }

  cancelarEliminarMiUsuario() {
    this.loadEliminarMiUsuario = false;
    this.loadNoSePudoEliminar = false;
  }


}
