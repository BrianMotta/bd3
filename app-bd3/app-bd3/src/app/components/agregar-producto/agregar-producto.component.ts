import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  //Producto que se crea
  nuevoProducto: Producto = {};
  //Campos del formulario
  nombreInput: string | null = null;
  categoriaInput: string = 'Alimento';
  descripcionInput: string | null = null;
  precioInput: number | null = null;
  unidadDeMedidaInput: string = 'Unidad';

  //Ruc/Dni del usuario
  id: string | null;

  //Mensaje
  mensajeError:boolean=false;

  constructor(private route: Router, private aRouter: ActivatedRoute, private _productoservices: ProductoService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  crearProducto() {
    this.mensajeError=false;
    if (this.id != null && this.nombreInput != null && this.categoriaInput != null && this.precioInput != null && this.unidadDeMedidaInput != null) {
      this.nuevoProducto = { ...this.nuevoProducto, "nombre": this.nombreInput, "categoria": this.categoriaInput, "idVendedor": this.id, "precio": this.precioInput, "unidadDeMedida": this.unidadDeMedidaInput }
      if (this.descripcionInput != null)
        this.nuevoProducto = { ...this.nuevoProducto, "descripcion": this.descripcionInput }
      this._productoservices.agregarProducto(this.nuevoProducto).subscribe(
        data => {
          this.route.navigate(['vista-usuario/' + this.id]);
        },
        error => {
          this.mensajeError=true;
        }
      );
    }

  }
}
