import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CrearFacturaComponent } from './componentes/crear-factura/crear-factura.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerFacturasComponent } from './componentes/ver-facturas/ver-facturas.component';

const routes: Routes = [
  {path : "", redirectTo: "/crearFactura", pathMatch : "full"},
  {path : "crearFactura", component: CrearFacturaComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    CrearFacturaComponent,
    VerFacturasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
