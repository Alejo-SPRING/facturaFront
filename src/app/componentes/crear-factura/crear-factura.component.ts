import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../services/cliente.service';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  public productos: any[];
  public productosSeleccionados: any[] = [];
  private producto: any;
  public cantidad: number;
  public clientes: any[];
  public clienteSeleccionado: any;

  constructor(private productoService: ProductoService, private modalService: NgbModal, private clienteService: ClienteService, private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.productosSeleccionados = [];
    this.clienteSeleccionado = [];
    this.productoService.getProductos().subscribe(
      response => {
        this.productos = response;
      },
      error => {
        console.log(error);
        swal.fire("Error", "Ha ocurrido un error intentalo de nuevo", "error");

      }
    );

    this.clienteService.getClientes().subscribe(
      response => {
        this.clientes = response;
      },
      error => {
        console.log(error);
        swal.fire("Error", "Ha ocurrido un error intentalo de nuevo", "error");
      }
    );
  }

  public open(content, producto: any): any {
    this.modalService.open(content, { size: "md" });
    this.producto = producto;
  }

  public seleccionarProducto(): void {
    if (this.cantidad <= this.producto.stock) {
      this.productosSeleccionados.push({
        producto: this.producto,
        cantidad: this.cantidad
      });
      this.producto = null;
      this.cantidad = 0;
      swal.fire("¡Producto seleccionado!", "", "success");
    } else {
      swal.fire("¡No hay suficiones existencias!", "", "error");
    }
  }

  public crearFactura(): void {
    if (this.productosSeleccionados.length > 0 && this.clienteSeleccionado != null) {
      let productos: any[] = [];
      for (let producto of this.productosSeleccionados) {
        productos.push({
          idProducto: producto.producto.id,
          cantidad: producto.cantidad
        });
      }
      let body = {
        clienteId: this.clienteSeleccionado,
        productos: productos
      }
      this.facturaService.crearFactura(body).subscribe(
        response => {
          swal.fire(response.mensaje, "", "success");
          this.ngOnInit();
        },
        error => {
          console.log(error);
          swal.fire("Error", "Ha ocurrido un error intentalo de nuevo", "error");
        }
      );
    } else {
      swal.fire("¡Selecciona minimo un producto y un cliente!", "", "error");
    }
  }

}
