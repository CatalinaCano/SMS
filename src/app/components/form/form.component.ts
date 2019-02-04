import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  forma: FormGroup;
  tipo_envio: string = undefined;

  constructor( public _subirArchivoService: SubirArchivoService) {
    this.tipo_envio = 'muestras';
   }

  ngOnInit() {
  }

  buscarPorOrden() {
    console.log(this.forma.value);
  }

}
