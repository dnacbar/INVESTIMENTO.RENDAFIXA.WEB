import { Component, Input, Signal } from '@angular/core';
import { Posicao } from '../../../model/posicao';
import { TabelaRendaFixaComponent } from '../../../../../library/component/tabela-renda-fixa/tabela-renda-fixa';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista',
  imports: [TabelaRendaFixaComponent],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista {
  @Input() listaDePosicao!: Signal<Posicao[]>;

  constructor(public datePipe: DatePipe, public currencyPipe: CurrencyPipe) { }
}
