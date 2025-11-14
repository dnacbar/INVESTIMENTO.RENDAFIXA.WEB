import { Component, input } from '@angular/core';
import { Extrato } from '../../../model/extrato';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista {
  public listaDeExtratoModel = input<Extrato[]>([]);

}
