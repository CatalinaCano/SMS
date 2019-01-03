import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  forma: FormGroup;

  constructor() {

    this.forma = new FormGroup({
      'numeroOrden': new FormControl( '', [Validators.required, Validators.minLength(6), Validators.maxLength(10)])
    });
   }

  ngOnInit() {
  }

  buscarPorOrden() {
    console.log(this.forma.value);
  }

}
