import { Component, Input, OnInit, Signal } from '@angular/core';
import { BloqueioInvestimento } from '../../../model/bloqueio-investimento';
import { TabelaRendaFixaComponent } from '../../../../../library/component/tabela-renda-fixa/tabela-renda-fixa';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, TabelaRendaFixaComponent],
  providers: [CurrencyPipe],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista {
  @Input() listaDeBloqueioInvestimentoSignal!: Signal<BloqueioInvestimento[]>;

  constructor(public currencyPipe: CurrencyPipe) { }
}
