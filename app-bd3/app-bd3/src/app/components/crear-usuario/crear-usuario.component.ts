import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  inputNombre: string | null = null;
  inputClave: string | null = null;
  inputRuc: string | null = null;
  inputCorreo: string | null = null;
  inputTelefono: number | null = null;
  inputTipo: string = 'Persona Natural';
  errorCrearUsuario: boolean = false;

  constructor(private route: Router, private _usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.errorCrearUsuario = false;
    if (this.inputNombre != null && this.inputClave != null && this.inputRuc != null && this.inputCorreo != null && this.inputTelefono != null) {
      const usuario = { 'nombre': this.inputNombre, 'tipo': this.inputTipo, 'clave': this.inputClave, 'ruc': this.inputRuc, 'correo': this.inputCorreo, 'telefono': this.inputTelefono }
      this._usuarioService.crearUsuario(usuario).subscribe(
        data => {
          this.route.navigate(['']);
        },
        error => {
          this.errorCrearUsuario = true;
        }
      )
    }

  }
}
