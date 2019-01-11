import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { Ordenes } from '../../interfaces/ordenes.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../../validators/validators';
import swal from 'sweetalert2';
import { ProveedoresService } from '../../services/proveedores.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Proveedores } from '../../interfaces/proveedores.interface';
import { ClientesService } from '../../services/clientes.service';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../interfaces/producto.interface';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {



  formulario: FormGroup;
  visible = false;

  ordenes: Ordenes[] = [];
  clientes: Cliente[] = [];
  proveedores: Proveedores[] = [];
  productos: Producto[] = [];
  cod_proveedor: string;
  cod_cliente: string;


  constructor( private _ordenesService: OrdenesService,
               private _provedoresService: ProveedoresService,
               private _clientesService: ClientesService,
               private _productosService: ProductosService ) {

    this.formulario = new FormGroup({
      'numeroOrden': new FormControl( '', [Validators.required, Validators.minLength(6), MyValidators.validarLongitudOrden ])
    });
   }
  /*
    El ngOnInit se utiliza cuando la pagina ya esta renderizada, primero se ejecuta el constructor
  */
  ngOnInit() {
    this.cargarClientes();
    this.ordenes = this._ordenesService.getOrdenes();
    this.proveedores = this._provedoresService.getProvedores();
    this.productos = this._productosService.getProductos();
  }

 cargarClientes() {
   this._clientesService.cargarClientes()
       .subscribe(
         res => {
          this.clientes = JSON.parse(JSON.stringify(res));
         }, error => console.log(error));

 }

  buscarPorOrden() {
     this.visible = true;
     (<HTMLInputElement> document.getElementById('txtNumeroOrden')).disabled = true;
     this._ordenesService.obtenerDatosOrden(this.formulario.value.numeroOrden);
  }

  limpiar() {
    this.visible = false;
    (<HTMLInputElement> document.getElementById('txtNumeroOrden')).disabled = false;
    this.formulario.reset();
  }

  subirArchivo() {
    console.log(this.cod_cliente);
    swal('Registro exitoso...', 'Subiendo Archivo', 'success');
    this.limpiar();

  }

 proveedorSeleccionado(idProveedor: number) {
    this.cod_proveedor = idProveedor.toString();
    (<HTMLInputElement> document.getElementById('proveedor')).disabled = true;
    console.log('Codigo del Proveedor: ' + this.cod_proveedor);

  }

  clienteSeleccionado(idCliente: number) {
    this.cod_cliente = idCliente.toString();
    (<HTMLInputElement> document.getElementById('cliente')).disabled = true;
    console.log('Codigo del Cliente: ' + this.cod_cliente);

  }
}
