import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';
import { DomSanitizer } from '@angular/platform-browser';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css', './formulario.component.scss']
})
export class FormularioComponent implements OnInit {


  @ViewChild('archivo') archivo: ElementRef;
  formulario: FormGroup;
  forma: FormGroup;
  visible = false;
  mostrarNombreArchivo = false;

  buscarProveedor = true;
  opcionesProveedor = false;

  buscarCliente = true;
  opcionesCliente = false;

  buscarProducto = true;
  opcionesProducto = false;

  ordenes: Ordenes[] = [];
  clientes: Cliente[] = [];
  proveedores: Proveedores[] = [];
  productos: Producto[] = [];

  numero_orden: string = undefined;
  cod_proveedor: string = undefined;
  cod_cliente: string = undefined;
  cod_producto: string = undefined;
  nombre_producto = ' ';
  archivoEntrada: File;

  nombreArchivo: string;
  selectedProveedorId;
  deshabilitarProveedor = false;

  constructor( private _ordenesService: OrdenesService,
               private _provedoresService: ProveedoresService,
               private _clientesService: ClientesService,
               private _productosService: ProductosService,
               private _subirArchivo: SubirArchivoService) {
    this.formulario = new FormGroup({
      'numeroOrden': new FormControl( '', [Validators.required, Validators.minLength(6), MyValidators.validarLongitudOrden ])
    });
   }


  /*
    El ngOnInit se utiliza cuando la pagina ya esta renderizada, primero se ejecuta el constructor
  */
  ngOnInit() {
    console.log(this.cod_proveedor);
    this.visible = false;
    this.forma = new FormGroup({
      'proveedor': new FormControl('', Validators.required),
      'cliente': new FormControl('', Validators.required),
      'producto': new FormControl('', Validators.required),
      'archivo': new FormControl('', Validators.required)
    });
  }



  buscarPorOrden() {
     (<HTMLInputElement> document.getElementById('txtNumeroOrden')).disabled = true;
      this.numero_orden = this.formulario.value.numeroOrden;
      this._ordenesService.obtenerDatosOrden(this.formulario.value.numeroOrden)
                          .subscribe( res => {
                            this.ordenes = JSON.parse(JSON.stringify(res));
                            console.log(this.ordenes);
                             if (this.ordenes.length === 0) {
                               console.log(this.ordenes);
                              swal('Error', 'El número de orden no existe', 'error');
                              this.limpiar();
                             } else {
                              this.visible = true;
                             }
                           });
  }

  limpiar() {
    this.visible = false;
    this.mostrarNombreArchivo = false;
    this.buscarProveedor = true;
    this.opcionesProveedor = false;
    this.buscarCliente = true;
    this.opcionesCliente = false;
    this.buscarProducto = true;
    this.opcionesProducto = false;
    this.numero_orden = undefined;
    this.cod_proveedor = undefined;
    this.cod_cliente = undefined;
    this.cod_producto = undefined;
    (<HTMLInputElement> document.getElementById('txtNumeroOrden')).disabled = false;
    this.formulario.reset();
    this.forma.reset();
  }

  subirArchivo() {
    swal('Registro exitoso...', 'Subiendo Archivo', 'success');
    this.limpiar();

  }

 proveedorSeleccionado(idProveedor: number) {
    this.cod_proveedor = idProveedor.toString();
    this.buscarProveedor = false;
    (<HTMLInputElement> document.getElementById('proveedor')).disabled = true;
  }

  clienteSeleccionado(idCliente: number) {
    this.cod_cliente = idCliente.toString();
    this._productosService.buscarProductosPorCliente(this.cod_cliente, this.nombre_producto)
        .subscribe(res => {
          this.productos = JSON.parse(JSON.stringify(res));
        }, error => console.log(error));
        (<HTMLInputElement> document.getElementById('cliente')).disabled = true;
        this.buscarCliente = false;
  }

  productoSeleccionado(idProducto: number) {
    this.cod_producto = idProducto.toString();
    (<HTMLInputElement> document.getElementById('producto')).disabled = true;
    this.buscarProducto = false;
    this.mostrarNombreArchivo = true;
  }


  seleccionArchivo(archivo: File) {
    if (!archivo) {
      this.archivoEntrada = null;
      return;
    }

    if (archivo.type.indexOf('text') < 0) {
        swal('Sólo Archivos .txt', 'El archivo seleccionado no es un archivo.txt', 'error');
        this.archivo.nativeElement.value = '';
        this.forma.controls['archivo'].setErrors({'incorrect': true});
      this.archivoEntrada = null;
      return;
    }

    this.nombreArchivo = this.cod_cliente + '_' + this.cod_producto + '_' + this.numero_orden;
    this.archivoEntrada = archivo;
    let base64Observable = new ReplaySubject(1);
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.archivoEntrada);
    fileReader.onload = event => {
      base64Observable.next(fileReader.result);
  };


  base64Observable.subscribe(res =>
    this._subirArchivo.subirArchivo(this.cod_proveedor, this.nombreArchivo, res)
                      .subscribe(
                        res => {  swal('Registro exitoso...', 'El Archivo se almaceno con éxito', 'success');
                                  this.limpiar();
                       }, err => {
                        swal('Registro exitoso...', 'El Archivo se almaceno con éxito', 'success');
                        this.limpiar();
                       }
                       ));
  }

  llenarProveedor(termino: string) {
    this._provedoresService.buscarProveedores(termino)
      .subscribe(
        res => {
           this.proveedores = JSON.parse(JSON.stringify(res));
           if (this.proveedores.length === 0) {
            swal('No existen Proveedores', 'No existen Proveedores con ese parametro de búsqueda', 'warning');
            (<HTMLInputElement>document.getElementById('textoProveedor')).value = '';
            this.opcionesProveedor = false;
           }
        }, err => console.error(err));

    this.opcionesProveedor = true;

  }

  llenarClientes(termino: string) {
    this._clientesService.buscarClientes(termino)
        .subscribe(
          res => {
            this.clientes = JSON.parse(JSON.stringify(res));
            if (this.clientes.length === 0) {
              swal('No existen Clientes', 'No existen clientes con ese parametro de búsqueda', 'warning');
              (<HTMLInputElement>document.getElementById('textoCliente')).value = '';
              this.opcionesCliente = false;
            }
          }, err => console.error(err));
    this.opcionesCliente = true;
  }


  llenarProductos(termino: string) {
    this.nombre_producto = termino;
    this._productosService.buscarProductosPorCliente(this.cod_cliente, this.nombre_producto)
        .subscribe(res => {
          this.productos = JSON.parse(JSON.stringify(res));
          if (this.productos.length === 0) {
            swal('No existen Productos', 'No existen Productos con ese parametro de búsqueda', 'warning');
            (<HTMLInputElement>document.getElementById('textoProducto')).value = '';
            this.opcionesProducto = false;
          }
        }, error => console.error(error));
        this.opcionesProducto = true;
  }

  validarCampos() {
    if (typeof(this.cod_proveedor) !== 'undefined' && typeof(this.cod_cliente) !== 'undefined' && typeof(this.cod_producto) !== 'undefined'  ){
       return true;
    }
    return false;
  }

}
