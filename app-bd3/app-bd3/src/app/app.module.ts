import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
//Componentes
import { AppComponent } from './app.component';
import { ConectarComponent } from './components/conectar/conectar.component';
import { HttpClientModule } from '@angular/common/http';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { DetallesProductoComponent } from './components/detalles-producto/detalles-producto.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { ModificarProductoComponent } from './components/modificar-producto/modificar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ConectarComponent,
    VistaUsuarioComponent,
    CrearUsuarioComponent,
    PaginaPrincipalComponent,
    PerfilUsuarioComponent,
    DetallesProductoComponent,
    AgregarProductoComponent,
    ModificarProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
