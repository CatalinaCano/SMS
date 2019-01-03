import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../../services/ordenes.service';
import { Ordenes } from '../../interfaces/ordenes.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {


  formulario: FormGroup;
  visible = false;

  ordenes: Ordenes[] = [];
  constructor( private _ordenesService: OrdenesService) {

    this.formulario = new FormGroup({
      'numeroOrden': new FormControl( '', [Validators.required, Validators.minLength(6)])
    });
   }
  /*
    El ngOnInit se utiliza cuando la pagina ya esta renderizada, primero se ejecuta el constructor
  */
  ngOnInit() {
    this.ordenes = this._ordenesService.getOrdenes();
    console.log(this.ordenes);
  }



  buscarPorOrden() {
     this.visible = true;
     console.log(this.formulario);
     console.log(this.formulario.value.numeroOrden);
     this._ordenesService.obtenerDatosOrden(this.formulario.value.numeroOrden);
  }

  limpiar() {
    this.visible = false;
    this.formulario.reset();
  }




}
