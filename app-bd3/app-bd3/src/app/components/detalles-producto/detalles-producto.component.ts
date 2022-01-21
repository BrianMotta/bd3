import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/models/global';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  //Producto que se crea
  productoDetalles: Producto = {};

  //Ruc/Dni del usuario
  id: string | null;
  //Ruc/Dni del vendedor
  idVendedor: string | null;
  //Nombre del Producto 
  nombreProducto: string | null;

  inputComentario: string | null = null;
  inputVoto: number | null = 5;

  load: boolean = false;
  mensajeEliminacionIncompleta: boolean = false;
  constructor(private aRouter: ActivatedRoute, private _productoservices: ProductoService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.idVendedor = this.aRouter.snapshot.paramMap.get('idVendedor');
    this.nombreProducto = this.aRouter.snapshot.paramMap.get('nombreProducto');
  }

  ngOnInit(): void {
    this.verDetallesProducto();
  }

  verDetallesProducto() {
    if (this.idVendedor != null && this.nombreProducto != null)
      this._productoservices.detallesProducto(this.nombreProducto, this.idVendedor).subscribe(
        data => {
          this.load = true;
          this.productoDetalles = data;
        },
        error => {
          this.load = false;
        }
      );
  }

  agregarCanasta() {
    if (this.idVendedor != null && this.nombreProducto != null && this.load) {
      Global.canasta.push({ ...this.productoDetalles, "idVendedor": this.idVendedor });
      console.log(Global.canasta);
    }
  }

  agregarComentario() {
    if (this.idVendedor != null && this.nombreProducto != null && this.load && this.inputComentario != null) {
      this._productoservices.agregarComentario(this.nombreProducto, this.idVendedor, this.inputComentario, new Date()).subscribe(
        data => {

          this.load = true;
          this.verDetallesProducto();
          this.inputComentario = null;
          console.log(this.productoDetalles)
        },
        error => {
          console.log(error)
        }
      );
    }
  }

  calificar() {
    if (this.idVendedor != null && this.nombreProducto != null && this.load && this.inputVoto != null && this.id != null) {
      this._productoservices.calificar({ "nombre": this.nombreProducto, "idVendedor": this.idVendedor, "idVotante": this.id, "puntuacion": this.inputVoto }).subscribe(
        data => {
          this.verDetallesProducto();
          console.log(this.productoDetalles)
        },
        error => {
          console.log(error)
        }
      );
    }
  }

  eliminarMiProducto(nombre: string) {
    this.mensajeEliminacionIncompleta = false;
    if (this.id != null && this.load)
      this._productoservices.eliminarProducto(nombre, this.id).subscribe(
        data => {
          this.verDetallesProducto();
        },
        error => {
          this.mensajeEliminacionIncompleta = true;
        }
      )
  }
}
