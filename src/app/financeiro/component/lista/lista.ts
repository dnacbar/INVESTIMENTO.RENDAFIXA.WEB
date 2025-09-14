import { Investimento } from './../../model/investimento';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista',
  imports: [],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista {
  @Input() listaDeInvestimento: Investimento[] | undefined;

  constructor() {
    this.listaDeInvestimento = [];
  }
}
