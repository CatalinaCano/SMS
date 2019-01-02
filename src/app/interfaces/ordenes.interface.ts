import { Cliente } from './cliente.interface';
import { Producto } from './producto.interface';

export  interface Ordenes {
    NUMERO_ORDEN: string;
    cliente: Cliente;
    producto: Producto;
}
