import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  //Producto que se crea
  antiguoProducto: Producto = {};
  productoModificado: Producto = {};
  //Campos del formulario
  nombreInput: string | null = null;
  categoriaInput: string | null = null;
  descripcionInput: string | null = null;
  precioInput: number | null = null;
  unidadDeMedidaInput: string | null = null

  //Ruc/Dni del usuario
  id: string | null;
  //Nombre del Producto 
  nombreProducto: string | null;

  load: boolean = false;

  constructor(private route: Router, private aRouter: ActivatedRoute, private _productoservices: ProductoService) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.nombreProducto = this.aRouter.snapshot.paramMap.get('nombreProducto');
  }

  ngOnInit(): void {
    this.verProductoModicar();
  }

  verProductoModicar() {
    if (this.id != null && this.nombreProducto != null) {
      this._productoservices.productoModificar(this.nombreProducto, this.id).subscribe(
        data => {
          this.load = true;
          this.antiguoProducto = data;
          this.nombreInput = this.antiguoProducto.nombre + '';
          this.categoriaInput = this.antiguoProducto.categoria + '';
          if (this.antiguoProducto.descripcion != undefined)
            this.descripcionInput = this.antiguoProducto.descripcion;
          else
            this.descripcionInput = null
          if (this.antiguoProducto.precio != undefined)
            this.precioInput = this.antiguoProducto.precio;
          this.unidadDeMedidaInput = this.antiguoProducto.unidadDeMedida + '';
        },
        error => {
          console.log(error)
        }
      );
    }
  }

  modificarProducto() {
    if (this.id != null && this.nombreInput != null && this.categoriaInput != null && this.precioInput != null && this.unidadDeMedidaInput != null && this.nombreProducto != null) {
      this.productoModificado = { ...this.productoModificado, "nombre": this.nombreInput, "categoria": this.categoriaInput, "idVendedor": this.id, "precio": this.precioInput, "unidadDeMedida": this.unidadDeMedidaInput }
      if (this.descripcionInput != null)
        this.productoModificado = { ...this.productoModificado, "descripcion": this.descripcionInput }
      this._productoservices.modificarProducto(this.nombreProducto, this.id, this.productoModificado).subscribe(
        data => {
          this.route.navigate(['vista-usuario/' + this.id]);
        },
        error => {
          console.log(error)
        }
      );
    }
  }
}
