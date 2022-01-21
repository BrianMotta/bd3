import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { ConectarComponent } from './components/conectar/conectar.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { DetallesProductoComponent } from './components/detalles-producto/detalles-producto.component';
import { ModificarProductoComponent } from './components/modificar-producto/modificar-producto.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';

const routes: Routes = [
  {path:'',component:ConectarComponent},
  {path:'vista-usuario/:id',component:VistaUsuarioComponent},
  {path:'crear-usuario',component:CrearUsuarioComponent},
  {path:'pagina-principal/:id',component:PaginaPrincipalComponent},
  {path:':id/ver-perfil/:idPerfil',component:PerfilUsuarioComponent},
  {path:':id/agregar-producto',component:AgregarProductoComponent},
  {path:':id/modificar-producto/:nombreProducto',component:ModificarProductoComponent},
  {path:':id/detalles-producto/:idVendedor/:nombreProducto',component:DetallesProductoComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
