import { FormControl } from '@angular/forms';

export class MyValidators {

  static validarLongitudOrden(control: FormControl) {
    const value = control.value;

    if (isNumber(value) === false) {
        return {
            'numeroOrden': true
          };
    }
    return null ;
  }
}


function isNumber(value: string | number): boolean {
   return !isNaN(Number(value.toString()));
}
