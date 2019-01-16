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

  numero_orden: string;
  cod_proveedor: string;
  cod_cliente: string;
  cod_producto: string;
  nombre_producto = ' ';
  archivoEntrada: File;
  archivoEntradaTemp;

  fileName: string;
  filePreview: string;
  selectedProveedorId;
  deshabilitarProveedor = false;

  constructor( private _ordenesService: OrdenesService,
               private _provedoresService: ProveedoresService,
               private _clientesService: ClientesService,
               private _productosService: ProductosService,
               private _subirArchivo: SubirArchivoService ,
               private sanitizer: DomSanitizer) {

    this.formulario = new FormGroup({
      'numeroOrden': new FormControl( '', [Validators.required, Validators.minLength(6), MyValidators.validarLongitudOrden ])
    });
   }


  /*
    El ngOnInit se utiliza cuando la pagina ya esta renderizada, primero se ejecuta el constructor
  */
  ngOnInit() {
    this.proveedores = this._provedoresService.getProvedores();
    this.forma = new FormGroup({
      'proveedor': new FormControl('', Validators.required),
      'cliente': new FormControl('', Validators.required),
      'producto': new FormControl('', Validators.required),
      'archivo': new FormControl('', Validators.required)
    });
  }



  buscarPorOrden() {
     this.visible = true;
     (<HTMLInputElement> document.getElementById('txtNumeroOrden')).disabled = true;
      this.numero_orden = this.formulario.value.numeroOrden;
     this._ordenesService.obtenerDatosOrden(this.formulario.value.numeroOrden);
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
    (<HTMLInputElement> document.getElementById('txtNumeroOrden')).disabled = false;
    this.formulario.reset();
    this.forma.reset();
  }

  subirArchivo() {
    console.log(this.cod_cliente);
    swal('Registro exitoso...', 'Subiendo Archivo', 'success');
    this.limpiar();

  }

 proveedorSeleccionado(idProveedor: number) {
    this.cod_proveedor = idProveedor.toString();
    console.log('El codigo del proveedor es: ' + this.cod_proveedor);
    this.buscarProveedor = false;
    (<HTMLInputElement> document.getElementById('proveedor')).disabled = true;
    console.log('Codigo del Proveedor: ' + this.cod_proveedor);

  }

  clienteSeleccionado(idCliente: number) {
    this.cod_cliente = idCliente.toString();
    (<HTMLInputElement> document.getElementById('cliente')).disabled = true;
    this.buscarCliente = false;
    this._productosService.buscarProductosPorCliente(this.cod_cliente, this.nombre_producto)
        .subscribe(res => {
          this.productos = JSON.parse(JSON.stringify(res));
        }, error => console.log(error));
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


    this.archivoEntrada = archivo;

    let reader = new FileReader();
    let urlArchivoTemp = reader.readAsDataURL(archivo);

    //reader.onloadend = () => this.archivoEntradaTemp = reader.result;
    reader.onload = () => {
     this.fileName = archivo.name + ' ' + archivo.type;
     this.filePreview = 'data:text' + ';base64,' + reader.result;
   };
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  llenarProveedor(termino: string) {
    console.log(termino);
    this.opcionesProveedor = true;

  }

  llenarClientes(termino: string) {
    this._clientesService.buscarClientes(termino)
        .subscribe(
          res => {
            this.clientes = JSON.parse(JSON.stringify(res));
            if (this.clientes.length === 0) {
              swal('No existen Clientes', 'No existen clientes con ese parametro de búsqueda', 'warning');
              (<HTMLInputElement>document.getElementById('textoCliente')).value = '   ';
              this.opcionesCliente = false;
            }
            console.log(this.clientes);
          }, err => console.log(err));
    this.opcionesCliente = true;
  }


  llenarProductos(termino: string) {
    this.nombre_producto = termino;
    this.opcionesProducto = true;
    this._productosService.buscarProductosPorCliente(this.cod_cliente, this.nombre_producto)
        .subscribe(res => {
          this.productos = JSON.parse(JSON.stringify(res));
          if (this.productos.length === 0) {
            swal('No existen Productos', 'No existen Productos con ese parametro de búsqueda', 'warning');
            (<HTMLInputElement>document.getElementById('textoProducto')).value = '   ';
            this.opcionesProducto = false;
          }
        }, error => console.log(error));
  }

}
