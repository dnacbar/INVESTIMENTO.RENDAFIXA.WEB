import { Component, input } from '@angular/core';
import { BloqueioInvestimento } from '../../../model/bloqueio-investimento';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TabelaRendaFixaComponent } from '../../../../../library/component/tabela-renda-fixa/tabela-renda-fixa';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, TabelaRendaFixaComponent],
  providers: [CurrencyPipe],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista {
  public listaDeBloqueioInvestimentoInput = input<BloqueioInvestimento[]>([]);

  constructor(public currencyPipe: CurrencyPipe) { }
}
