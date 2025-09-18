import { CommonModule } from '@angular/common';
import { Investimento } from './../../model/investimento';
import { AfterViewInit, Component, Input } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-lista',
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista implements AfterViewInit {
  @Input() listaDeInvestimento: Investimento[];

  constructor() {
    this.listaDeInvestimento = [];
  }

  ngAfterViewInit(): void {
    ($('#myTable') as any).DataTable();
  }

  public visualizaInvestimento(investimento: Investimento): void {
    console.log('Visualizar investimento', investimento);
  }
}
