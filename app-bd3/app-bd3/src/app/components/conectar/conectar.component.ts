import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-conectar',
  templateUrl: './conectar.component.html',
  styleUrls: ['./conectar.component.css']
})

export class ConectarComponent implements OnInit {

  inputCorreo: string | null = null;
  inputClave: string | null = null;
  noEncontro: boolean = false;

  constructor(private router: Router, private _conexionservice: ConexionService) {

  }

  ngOnInit(): void {
  }

  conectar() {
    this.noEncontro=false
    if (this.inputCorreo != null && this.inputClave != null)
      this._conexionservice.verificarUsuario(this.inputCorreo, this.inputClave).subscribe(
        data => {
          this.router.navigate(['vista-usuario/' + data.ruc]);       
        },
        error => {
          this.noEncontro = true
        }
      )

  }
}

